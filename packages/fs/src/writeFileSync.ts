import { Abortable } from 'events';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Options for the `writeFileSync` function.
 */
export type WriteFileSyncOptions = fs.ObjectEncodingOptions &
  Abortable & {
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

    /**
     * If true, the parent directory will not be made.
     */
    noRecursiveDir?: boolean;
  };

/**
 * Read the contents of a file.
 *
 * @param pathLike - Path to the file.
 * @param options
 */
function writeFileSync(
  pathLike: fs.PathLike,
  data: string | NodeJS.ArrayBufferView,
  options: WriteFileSyncOptions = {}
): void {
  const { noRecursiveDir = false, encoding = 'utf8', ...writeOptions } = options;

  const directory = path.dirname(pathLike.toString());
  if (!noRecursiveDir && !fs.existsSync(directory)) fs.mkdirSync(directory, { recursive: true });

  fs.writeFileSync(pathLike, data, { encoding, ...writeOptions });
}

export default writeFileSync;
