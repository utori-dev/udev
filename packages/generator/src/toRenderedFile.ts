import { TemplateValue } from '@udev/schema';
import loadTemplatePlaceholder from './loadTemplatePlaceholder';
import { LoadedTemplate, LoadedTemplateFile, LoadedTemplatePlaceholder, RenderedFile, TemplateValues } from './types';

type ToRenderedFileOptions = {
  data: string;
  values: TemplateValues;
  template: LoadedTemplate;
  templateFile: LoadedTemplateFile;
};

function replaceTemplatePlaceholder(
  templateValue: string,
  value: TemplateValue,
  placeholder?: LoadedTemplatePlaceholder
): string {
  if (!placeholder) return templateValue;

  const { camelCase, kebabCase, snakeCase, pascalCase, upperSnakeCase } = loadTemplatePlaceholder(`${value}`);

  return templateValue
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

function toRenderedFile(options: ToRenderedFileOptions): RenderedFile {
  const { templateFile, values, template, data } = options;

  const rendered: RenderedFile = {
    name: templateFile.name,
    data,
    templateFile,
  };

  Object.entries(values).forEach(([key, value]) => {
    rendered.name = replaceTemplatePlaceholder(rendered.name, value, template.placeholders[key]);
    rendered.data = replaceTemplatePlaceholder(rendered.data, value, template.placeholders[key]);
  });

  return rendered;
}

export default toRenderedFile;
