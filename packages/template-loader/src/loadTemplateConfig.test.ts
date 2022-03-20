import * as path from 'path';
import { Template } from '@udev/schema';
import { readJsonSync as _readJsonSync } from '@udev/fs';
import loadTemplateConfig from './loadTemplateConfig';

const readJsonSync: jest.Mock = _readJsonSync as any;

jest.mock('@udev/fs', () => ({
  readJsonSync: jest.fn(),
}));

describe('loadTemplateConfig', () => {
  it('should convert directory to absolute path', () => {
    // Arrange
    const config: Template = {
      directory: 'foo/bar',
      name: 'test',
      placeholders: {
        name: 'any-name',
      },
    };
    readJsonSync.mockImplementation(() => config);
    const templateConfigPath = path.join(process.cwd(), 'test.template.json');

    // Act
    const result = loadTemplateConfig(templateConfigPath);

    // Assert
    expect(result).toEqual({
      directory: path.join(process.cwd(), config.directory),
      name: 'test',
      placeholders: {
        name: 'any-name',
      },
    });
  });
});
