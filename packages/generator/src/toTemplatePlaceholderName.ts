import { TemplatePlaceholderName } from './types';
import {
  camelCase as toCamelCase,
  capitalize,
  kebabCase as toKebabCase,
  snakeCase as toSnakeCase,
  words as toWords,
} from 'lodash';

function toTemplatePlaceholderName(
  placeholderName: string | TemplatePlaceholderName = 'placeholder-name'
): TemplatePlaceholderName {
  if (typeof placeholderName === 'object') return placeholderName;

  const camelCase = toCamelCase(placeholderName);
  const kebabCase = toKebabCase(placeholderName);
  const pascalCase = toWords(placeholderName).map(capitalize).join('');
  const snakeCase = toSnakeCase(placeholderName);
  const upperSnakeCase = snakeCase.toUpperCase();

  return {
    camelCase,
    kebabCase,
    pascalCase,
    snakeCase,
    upperSnakeCase,
  };
}

export default toTemplatePlaceholderName;
