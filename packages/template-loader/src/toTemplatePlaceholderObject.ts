import { TemplatePlaceholderObject } from './types';
import { TemplatePlaceholder } from '@udev/schema';
import {
  camelCase as toCamelCase,
  capitalize,
  kebabCase as toKebabCase,
  snakeCase as toSnakeCase,
  words as toWords,
} from 'lodash';

/**
 * Convert a `TemplatePlaceholder` from a configuration to
 * a `TemplatePlaceholderObject` that can be used to render a template.
 *
 * @param placeholder - Value from a configuration.
 *
 * @returns Value that can be used to render a template.
 */
function toTemplatePlaceholderObject(placeholder: TemplatePlaceholder): TemplatePlaceholderObject {
  if (typeof placeholder === 'object') return placeholder;

  const camelCase = toCamelCase(placeholder);
  const kebabCase = toKebabCase(placeholder);
  const pascalCase = toWords(placeholder).map(capitalize).join('');
  const snakeCase = toSnakeCase(placeholder);
  const upperSnakeCase = snakeCase.toUpperCase();
  const passthrough = `{{ ${toWords(placeholder).join(' ')} }}`;

  return {
    camelCase,
    kebabCase,
    pascalCase,
    snakeCase,
    upperSnakeCase,
    passthrough,
  };
}

export default toTemplatePlaceholderObject;
