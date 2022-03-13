import { FilterImplOptions, Liquid } from 'liquidjs';
import { LiquidOptions } from 'liquidjs/dist/liquid-options';
import toRenderedFile from './toRenderedFile';
import { LoadedTemplate, RenderedFile, TemplateValues } from './types';
import { camelCase as toCamelCase, snakeCase as toSnakeCase, kebabCase as toKebabCase, capitalize } from 'lodash';

const filterCamelCase: FilterImplOptions = (original: string) => toCamelCase(original);
const filterKebabCase: FilterImplOptions = (original: string) => toKebabCase(original);
const filterPascalCase: FilterImplOptions = (original: string) => capitalize(toCamelCase(original));
const filterSnakeCase: FilterImplOptions = (original: string) => toSnakeCase(original);
const filterUpperSnakeCase: FilterImplOptions = (original: string) => toSnakeCase(original).toUpperCase();

function renderTemplate(
  template: LoadedTemplate,
  values: TemplateValues,
  options: LiquidOptions = { cache: true }
): Promise<RenderedFile[]> {
  const engine = new Liquid(options);
  engine.registerFilter('camelCase', filterCamelCase);
  engine.registerFilter('kebabCase', filterKebabCase);
  engine.registerFilter('pascalCase', filterPascalCase);
  engine.registerFilter('snakeCase', filterSnakeCase);
  engine.registerFilter('upperSnakeCase', filterUpperSnakeCase);

  return Promise.all(
    template.files.map((templateFile) =>
      engine
        .parseAndRender(templateFile.data, values)
        .then((data) => toRenderedFile({ data, templateFile, template, values }))
    )
  );
}

export default renderTemplate;
