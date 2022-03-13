import * as fs from 'fs';

/**
 * Options for the `readFileSync` function.
 */
export type ReadFileSyncOptions = {
  /**
   * If the file does not exist, this will be used.
   *
   * If this is not provided and the file does not exist, an error will be thrown.
   */
  defaultData?: string;

  /**
   * Encoding for the JSON file.
   *
   * @default 'utf8'
   */
  encoding?: BufferEncoding;

  /**
   * Flag for reading the JSON file.
   */
  flag?: string;
};

/**
 * Read the contents of a file.
 *
 * @param pathLike - Path to the file.
 * @param options
 */
function readFileSync(pathLike: fs.PathLike, options: ReadFileSyncOptions = {}): string {
  const { defaultData, encoding = 'utf8', flag } = options;

  // If the path doesn't exist, we'll return the defaultData if provided.
  // Otherwise, we'll let the standard read file error be thrown.
  if (!fs.existsSync(pathLike) && defaultData) return defaultData;

  return fs.readFileSync(pathLike, { encoding, flag });
}

export default readFileSync;
