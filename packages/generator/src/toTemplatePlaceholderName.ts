import { TemplatePlaceholderName } from './types';
import { camelCase as toCamelCase, snakeCase as toSnakeCase, kebabCase as toKebabCase, capitalize } from 'lodash';

function toTemplatePlaceholderName(
  placeholderName: string | TemplatePlaceholderName = 'placeholder-name'
): TemplatePlaceholderName {
  if (typeof placeholderName === 'object') return placeholderName;

  const camelCase = toCamelCase(placeholderName);
  const kebabCase = toKebabCase(placeholderName);
  const pascalCase = capitalize(camelCase);
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
