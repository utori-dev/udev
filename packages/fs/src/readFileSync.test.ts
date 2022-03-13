import * as fs from 'fs';
import readFileSync from './readFileSync';

const mockFS = {
  existsSync: fs.existsSync as jest.Mock,
  readFileSync: fs.readFileSync as jest.Mock,
};

jest.mock('fs', () => ({
  ...jest.requireActual('fs'),
  existsSync: jest.fn(),
  readFileSync: jest.fn(),
}));

describe('readFileSync', () => {
  it('should return defaultJson if file does not exist', () => {
    // Arrange
    mockFS.existsSync.mockImplementation(() => false);
    const defaultData = 'Hello World';

    // Act
    const result = readFileSync('foo.txt', { defaultData });

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
      readFileSync('foo.txt');
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
    readFileSync('foo.txt', { encoding, flag });

    // Assert
    expect(mockFS.readFileSync).toHaveBeenCalledWith('foo.txt', { encoding, flag });
  });

  afterEach(() => jest.clearAllMocks());
});
