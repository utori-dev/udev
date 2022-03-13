import * as fs from 'fs';
import * as path from 'path';

export type DirectoryItemType =
  | 'block-device'
  | 'character-device'
  | 'directory'
  | 'fifo'
  | 'file'
  | 'socket'
  | 'symbolic-link'
  | 'unknown';

export type DirectoryItem = {
  entries?: DirectoryItem[];
  entry: fs.Dirent;
  name: string;
  path: string;
  type: DirectoryItemType;
};

/**
 * Map a `fs.Dirent` object to a `DirectoryItem`.
 *
 * @param dirent
 * @param options
 */
export function mapDirectoryItemType(dirent: fs.Dirent): DirectoryItemType {
  // Most common types
  if (dirent.isFile()) return 'file';
  if (dirent.isDirectory()) return 'directory';

  // Additional types
  if (dirent.isBlockDevice()) return 'block-device';
  if (dirent.isCharacterDevice()) return 'character-device';
  if (dirent.isFIFO()) return 'fifo';
  if (dirent.isSocket()) return 'socket';
  if (dirent.isSymbolicLink()) return 'symbolic-link';

  // This shouldn't happen, but we'll play it safe just in case it can.
  return 'unknown';
}

/**
 * Options for mapping a directory item.
 */
export type MapDirentOptions = {
  /**
   * Name of the parent directory.
   *
   * @default '''
   */
  directoryName?: string;

  /**
   * Path to the parent directory.
   */
  directoryPath: string;

  /**
   * Encoding for the JSON file.
   *
   * @default 'utf8'
   */
  encoding?: BufferEncoding;

  /**
   * Filter the directory items.
   * This function should return true for any item that should be included.
   */
  filter?: (item: DirectoryItem) => boolean;

  /**
   * Read items of the directory.
   */
  recursive?: boolean;
};

/**
 * Map a `fs.Dirent` object to a `DirectoryItem`.
 *
 * @param entry
 * @param options
 */
export function mapDirectoryItem(entry: fs.Dirent, options: MapDirentOptions): DirectoryItem {
  const { directoryPath, directoryName = '', recursive, encoding, filter = () => true } = options;

  const absolutePath = path.join(directoryPath, entry.name);
  const name = path.join(directoryName, entry.name);
  const type = mapDirectoryItemType(entry);

  if (!entry.isDirectory() || !recursive) {
    return {
      entry,
      name,
      type,
      path: absolutePath,
    };
  }

  const entries = fs
    .readdirSync(absolutePath, { withFileTypes: true, encoding })
    .map((childEntry) =>
      mapDirectoryItem(childEntry, {
        directoryName: name,
        directoryPath: absolutePath,
        encoding,
        filter,
        recursive,
      })
    )
    .filter(filter);

  return {
    entry,
    name,
    type,
    path: absolutePath,
    entries,
  };
}

/**
 * Options for the `readDirectorySync` function.
 */
export type ReadDirectorySyncOptions = {
  /**
   * If the directory does not exist, this will be used.
   *
   * If this is not provided and the directory does not exist, an error will be thrown.
   */
  defaultData?: DirectoryItem[];

  /**
   * Encoding for the JSON file.
   *
   * @default 'utf8'
   */
  encoding?: BufferEncoding;

  /**
   * Filter the directory items.
   * This function should return true for any item that should be included.
   */
  filter?: (item: DirectoryItem) => boolean;

  /**
   * Recursively read items of the directory.
   */
  recursive?: boolean;
};

/**
 * Read the contents of a directory.
 *
 * @param pathLike - Path to the directory.
 * @param options
 */
function readDirectorySync(pathLike: fs.PathLike, options: ReadDirectorySyncOptions = {}): DirectoryItem[] {
  const { defaultData, filter = () => true, encoding = 'utf8', recursive = false } = options;

  // If the path doesn't exist, we'll return the defaultData if provided.
  // Otherwise, we'll let the standard error be thrown.
  if (!fs.existsSync(pathLike) && defaultData) return defaultData;

  return fs
    .readdirSync(pathLike, { withFileTypes: true, encoding })
    .map((entry) => mapDirectoryItem(entry, { directoryPath: pathLike.toString(), encoding, recursive }))
    .filter(filter);
}

export default readDirectorySync;
