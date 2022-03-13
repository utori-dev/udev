export type TemplateScope = {
  name: string;

  [key: string]: unknown;
};

export type Template = {
  name: string;

  path: string;

  data: string;
};

export type TemplatePlaceholderName = {
  kebabCase: string;
  camelCase: string;
  pascalCase: string;
  snakeCase: string;
  upperSnakeCase: string;
};

export type TemplateCollection = {
  path: string;

  placeholderName: TemplatePlaceholderName;

  templates: Template[];
};

export type RenderedTemplate<SCOPE extends TemplateScope = TemplateScope> = {
  template: Template;
  name: string;
  data: string;
  scope: SCOPE;
};
