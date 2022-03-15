import { DirectoryItem, readFileSync as _readFileSync } from '@udev/fs';
import loadTemplateFile from './loadTemplateFile';
import toTemplatePlaceholderObject from './toTemplatePlaceholderObject';

const readFileSync: jest.Mock = _readFileSync as any;

jest.mock('@udev/fs', () => ({
  readFileSync: jest.fn(),
}));

describe('toTemplatePlaceholderObject', () => {
  it('should return object as is', () => {
    // Arrange
    const placeholder = {} as any;

    // Act
    const result = toTemplatePlaceholderObject(placeholder);

    // Assert
    expect(result).toEqual(placeholder);
  });

  it('should correctly convert kebab-case input', () => {
    // Act
    const result = toTemplatePlaceholderObject('hello-world');

    // Assert
    expect(result).toEqual({
      camelCase: 'helloWorld',
      kebabCase: 'hello-world',
      pascalCase: 'HelloWorld',
      passthrough: '{{ hello world }}',
      snakeCase: 'hello_world',
      upperSnakeCase: 'HELLO_WORLD',
    });
  });
});
