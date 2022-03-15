import toTemplatePlaceholderObject from './toTemplatePlaceholderObject';
import { TemplatePlaceholderObject } from './types';

export type ReplaceTemplatePlaceholderOptions = {
  /**
   * Data from the template that will may contain a placeholder value.
   */
  templateData: string;

  /**
   * Value that will replace the placeholder value in the template data.
   */
  value: string | number | boolean;

  /**
   * Placeholder used to replace values in the template data.
   *
   * If this is `undefined`, the template data will be returned without modification.
   */
  placeholder: TemplatePlaceholderObject;
};

/**
 * Replaces the placeholder values in the template data with the actual value for the new file.
 *
 * @param options
 *
 * @returns The template data with all placeholder values replaced.
 */
function replaceTemplatePlaceholder(options: ReplaceTemplatePlaceholderOptions): string {
  const { placeholder, value, templateData } = options;

  const { camelCase, kebabCase, snakeCase, pascalCase, upperSnakeCase } = toTemplatePlaceholderObject(`${value}`);

  return templateData
    .split(placeholder.camelCase)
    .join(camelCase)
    .split(placeholder.kebabCase)
    .join(kebabCase)
    .split(placeholder.snakeCase)
    .join(snakeCase)
    .split(placeholder.pascalCase)
    .join(pascalCase)
    .split(placeholder.upperSnakeCase)
    .join(upperSnakeCase);
}

export default replaceTemplatePlaceholder;
