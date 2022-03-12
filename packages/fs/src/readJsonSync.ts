import * as fs from 'fs';

/**
 * Regular expression to match trailing commas in a JSON object.
 */
export const JSON_TRAILING_COMMAS: RegExp = /\,(?!\s*[\{\"\w])/g;

/**
 * Default function to normalize a raw JSON string before it is passed to `JSON.parse`.
 *
 * This will ensure the value is actually a string and remove all trailing commas.
 *
 * @param raw Raw JSON string
 * @returns Normalized JSON string that is ready to be parsed.
 */
export function normalizeRawJson(raw: string): string {
  return raw.toString().replace(JSON_TRAILING_COMMAS, '');
}

/**
 * Options for the `readJsonSync` function.
 */
export type ReadJsonSyncOptions<T extends object = object> = {
  /**
   * If the JSON file does not exist, this will be used.
   *
   * If this is not provided and the file does not exist, an error will be thrown.
   */
  defaultJson?: T;

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
   * Function to normalize the raw JSON string before it is parsed.
   *
   * @default normalizeRawJson
   */
  normalizer?: (raw: string) => string;

  /**
   * Reviver passed to the `JSON.parse` function.
   *
   * This is a function that transforms the results.
   * This function is called for each member of the object.
   */
  reviver?: (this: any, key: string, value: any) => any;

  /**
   * Validate that the object is the expected type.
   * An error will be thrown if the object is invalid.
   */
  validate?: (object: object) => object is T;
};

/**
 * Read a JSON object from a file.
 *
 * @param pathLike - Path to the JSON file.
 * @param options
 */
function readJsonSync<T extends object = object>(pathLike: fs.PathLike, options: ReadJsonSyncOptions<T> = {}): T {
  const { defaultJson, validate: isValid, encoding = 'utf8', flag, normalizer = normalizeRawJson, reviver } = options;

  // If the path doesn't exist, we'll return the defaultJson if provided.
  // Otherwise, we'll let the standard read file error be thrown.
  if (!fs.existsSync(pathLike) && defaultJson) return defaultJson;

  const raw = fs.readFileSync(pathLike, { encoding, flag });
  const normalized = normalizer(raw);
  const parsed = JSON.parse(normalized, reviver);

  if (isValid && !isValid(parsed)) {
    throw new Error(`JSON from '${pathLike.toString()}' was parsed but did not pass validation.`);
  }

  return parsed;
}

export default readJsonSync;
