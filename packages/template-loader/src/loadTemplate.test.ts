import loadTemplate from './loadTemplate';

import { readDirectorySync as _readDirectorySync, DirectoryItem } from '@udev/fs';

const readDirectorySync: jest.Mock = _readDirectorySync as any;

jest.mock('@udev/fs', () => ({
  readDirectorySync: jest.fn(),
}));

jest.mock('./loadTemplateFile', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(({ name, path }) => ({ name, path, data: 'Test' })),
}));

jest.mock('./toTemplatePlaceholderObject', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation((placeholder) => ({ name: 'fake placeholder', placeholder })),
}));

describe('loadTemplate', () => {
  it('should correctly load template files', () => {
    // Arrange
    const directoryItems: DirectoryItem[] = [
      {
        name: 'package.json',
        entry: {} as any,
        type: 'file',
        path: '/foo/bar',
      },
      {
        name: 'src',
        entry: {} as any,
        type: 'directory',
        path: '/foo/bar',
        entries: [
          {
            name: 'index.ts',
            entry: {} as any,
            type: 'file',
            path: '/foo/bar/src',
          },
          {
            name: 'test.ts',
            entry: {} as any,
            type: 'file',
            path: '/foo/bar/src',
          },
        ],
      },
    ];
    readDirectorySync.mockImplementation(() => directoryItems);

    // Act
    const result = loadTemplate({
      directory: '/foo/bar',
      name: 'test',
      placeholders: {
        name: 'any-name',
      },
    });

    // Assert
    expect(result.files).toEqual([
      {
        name: 'package.json',
        path: '/foo/bar',
        data: 'Test',
      },
      {
        name: 'index.ts',
        path: '/foo/bar/src',
        data: 'Test',
      },
      {
        name: 'test.ts',
        path: '/foo/bar/src',
        data: 'Test',
      },
    ]);
  });

  it('should correctly build placeholders map', () => {
    // Arrange
    readDirectorySync.mockImplementation(() => []);

    // Act
    const result = loadTemplate({
      directory: '/foo/bar',
      name: 'test',
      placeholders: {
        name: 'fake-name',
        value: 'fake-value',
      },
    });

    // Assert
    expect(result.placeholders).toEqual(
      new Map([
        ['name', { name: 'fake placeholder', placeholder: 'fake-name' }],
        ['value', { name: 'fake placeholder', placeholder: 'fake-value' }],
      ])
    );
  });
});
