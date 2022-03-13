import * as fs from 'fs';
import readJsonSync, { normalizeRawJson } from './readJsonSync';

const mockFS = {
  existsSync: fs.existsSync as jest.Mock,
  readFileSync: fs.readFileSync as jest.Mock,
};

jest.mock('fs', () => ({
  ...jest.requireActual('fs'),
  existsSync: jest.fn(),
  readFileSync: jest.fn(),
}));

describe('readJsonSync', () => {
  it('should return defaultData if file does not exist', () => {
    // Arrange
    mockFS.existsSync.mockImplementation(() => false);
    const defaultData: any = {};

    // Act
    const result = readJsonSync('foo.json', { defaultData });

    // Assert
    expect(result).toBe(defaultData);
  });

  it('should let readFileSync throw error if file does not exist', () => {
    // Arrange
    expect.assertions(1);
    mockFS.existsSync.mockImplementation(() => false);
    mockFS.readFileSync.mockImplementation(() => {
      throw new Error('ENOENT');
    });

    try {
      // Act
      readJsonSync('foo.json');
    } catch (error) {
      // Assert
      expect(error).toEqual(new Error('ENOENT'));
    }
  });

  it('should allow encoding and flag to be specified', () => {
    // Arrange
    mockFS.existsSync.mockImplementation(() => true);
    mockFS.readFileSync.mockImplementation(() => '{}');
    const encoding: BufferEncoding = 'ascii';
    const flag = 'w+';

    // Act
    readJsonSync('foo.json', { encoding, flag });

    // Assert
    expect(mockFS.readFileSync).toHaveBeenCalledWith('foo.json', { encoding, flag });
  });

  it('should validate object if validator is provided', () => {
    // Arrange
    expect.assertions(1);
    mockFS.existsSync.mockImplementation(() => true);
    mockFS.readFileSync.mockImplementation(() => '{}');
    const validate: any = jest.fn().mockImplementation(() => true);

    // Act
    const result = readJsonSync('foo.json', { validate });

    // Assert
    expect(validate).toHaveBeenCalledWith(result);
  });

  it('should throw error if validator was provided and object is not valid', () => {
    // Arrange
    expect.assertions(1);
    mockFS.existsSync.mockImplementation(() => true);
    mockFS.readFileSync.mockImplementation(() => '{}');
    const validate: any = jest.fn().mockImplementation(() => false);

    try {
      // Act
      readJsonSync('foo.json', { validate });
    } catch (error) {
      // Assert
      expect(error).toEqual(new Error(`JSON from 'foo.json' was parsed but did not pass validation.`));
    }
  });

  it('should accept custom normalizer', () => {
    // Arrange
    expect.assertions(1);
    mockFS.existsSync.mockImplementation(() => true);
    mockFS.readFileSync.mockImplementation(() => '{}');
    const normalizer: any = jest.fn().mockImplementation((value) => value);

    // Act
    readJsonSync('foo.json', { normalizer });

    // Assert
    expect(normalizer).toHaveBeenCalledWith('{}');
  });

  afterEach(() => jest.clearAllMocks());
});

describe('normalizeRawJson', () => {
  it('should remove trailing commas', () => {
    // Arrange
    const original = '{ "foo": true, "bar": true, }';
    const expected = '{ "foo": true, "bar": true }';

    // Act
    const result = normalizeRawJson(original);

    // Assert
    expect(result).toBe(expected);
  });
});
