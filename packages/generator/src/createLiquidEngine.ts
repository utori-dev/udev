import { LoadedTemplate, TemplateValues, RenderedTemplateFile, renderTemplateFile } from '@udev/template-loader';
import { FilterImplOptions, Liquid } from 'liquidjs';
import { LiquidOptions } from 'liquidjs/dist/liquid-options';
import { camelCase as toCamelCase, snakeCase as toSnakeCase, kebabCase as toKebabCase, capitalize } from 'lodash';

export type CreateLiquidEngineOptions = {
  liquidOptions?: LiquidOptions;
};

const filterCamelCase: FilterImplOptions = (original: string) => toCamelCase(original);
const filterKebabCase: FilterImplOptions = (original: string) => toKebabCase(original);
const filterPascalCase: FilterImplOptions = (original: string) => capitalize(toCamelCase(original));
const filterSnakeCase: FilterImplOptions = (original: string) => toSnakeCase(original);
const filterUpperSnakeCase: FilterImplOptions = (original: string) => toSnakeCase(original).toUpperCase();

/**
 * Creates a new `Liquid` engine for processing templates.
 *
 * @param options
 * @returns
 */
function createLiquidEngine(options: CreateLiquidEngineOptions = {}): Liquid {
  const { liquidOptions = { cache: true } } = options;

  const engine = new Liquid(liquidOptions);

  // Register filters
  engine.registerFilter('camelCase', filterCamelCase);
  engine.registerFilter('kebabCase', filterKebabCase);
  engine.registerFilter('pascalCase', filterPascalCase);
  engine.registerFilter('snakeCase', filterSnakeCase);
  engine.registerFilter('upperSnakeCase', filterUpperSnakeCase);

  return engine;
}

export default createLiquidEngine;
