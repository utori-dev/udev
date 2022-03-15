import { DirectoryItem, readFileSync as _readFileSync } from '@udev/fs';
import loadTemplateFile from './loadTemplateFile';

const readFileSync: jest.Mock = _readFileSync as any;

jest.mock('@udev/fs', () => ({
  readFileSync: jest.fn(),
}));

describe('loadTemplateFile', () => {
  it('should load directory item', () => {
    // Arrange
    const item: DirectoryItem = {
      name: 'package.json',
      entry: {} as any,
      type: 'file',
      path: '/foo/bar',
    };
    readFileSync.mockImplementation(() => 'Fake data');

    // Act
    const result = loadTemplateFile(item);

    // Assert
    expect(result).toEqual({
      name: item.name,
      path: item.path,
      data: 'Fake data',
    });
  });
});
