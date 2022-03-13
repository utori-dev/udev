import { FilterImplOptions, Liquid } from 'liquidjs';
import { LiquidOptions } from 'liquidjs/dist/liquid-options';
import toRenderedTemplate from './toRenderedTemplate';
import { RenderedTemplate, TemplateCollection, TemplateScope } from './types';
import { camelCase as toCamelCase, snakeCase as toSnakeCase, kebabCase as toKebabCase, capitalize } from 'lodash';

const filterCamelCase: FilterImplOptions = (original: string) => toCamelCase(original);
const filterKebabCase: FilterImplOptions = (original: string) => toKebabCase(original);
const filterPascalCase: FilterImplOptions = (original: string) => capitalize(toCamelCase(original));
const filterSnakeCase: FilterImplOptions = (original: string) => toSnakeCase(original);
const filterUpperSnakeCase: FilterImplOptions = (original: string) => toSnakeCase(original).toUpperCase();

function renderTemplateCollection(
  collection: TemplateCollection,
  scope: TemplateScope,
  options: LiquidOptions = { cache: true }
): Promise<RenderedTemplate[]> {
  const engine = new Liquid(options);
  engine.registerFilter('camelCase', filterCamelCase);
  engine.registerFilter('kebabCase', filterKebabCase);
  engine.registerFilter('pascalCase', filterPascalCase);
  engine.registerFilter('snakeCase', filterSnakeCase);
  engine.registerFilter('upperSnakeCase', filterUpperSnakeCase);

  return Promise.all(
    collection.templates.map((template) =>
      engine
        .parseAndRender(template.data, scope)
        .then((data) => toRenderedTemplate({ data, scope, template, placeholderName: collection.placeholderName }))
    )
  );
}

export default renderTemplateCollection;
