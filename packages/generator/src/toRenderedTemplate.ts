import toTemplatePlaceholderName from './toTemplatePlaceholderName';
import { RenderedTemplate, Template, TemplatePlaceholderName, TemplateScope } from './types';

type ToRenderedTemplateOptions<SCOPE extends TemplateScope = TemplateScope> = {
  placeholderName: TemplatePlaceholderName;
  data: string;
  scope: SCOPE;
  template: Template;
};

/**
 *
 * @param value
 * @param renderName
 * @param placeholderName
 * @returns
 */
function replaceTemplatePlaceholderName(
  value: string,
  renderName: string,
  placeholderName: TemplatePlaceholderName
): string {
  const { camelCase, kebabCase, snakeCase, pascalCase, upperSnakeCase } = toTemplatePlaceholderName(renderName);

  return value
    .split(placeholderName.camelCase)
    .join(camelCase)
    .split(placeholderName.kebabCase)
    .join(kebabCase)
    .split(placeholderName.snakeCase)
    .join(snakeCase)
    .split(placeholderName.pascalCase)
    .join(pascalCase)
    .split(placeholderName.upperSnakeCase)
    .join(upperSnakeCase);
}

function toRenderedTemplate<SCOPE extends TemplateScope = TemplateScope>(
  options: ToRenderedTemplateOptions<SCOPE>
): RenderedTemplate<SCOPE> {
  const { placeholderName, scope, template, data } = options;

  return {
    data: replaceTemplatePlaceholderName(data, scope.name, placeholderName),
    name: replaceTemplatePlaceholderName(template.name, scope.name, placeholderName),
    scope,
    template,
  };
}

export default toRenderedTemplate;
