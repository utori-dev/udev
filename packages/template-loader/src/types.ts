import { TemplateValue, TemplatePlaceholder, Template } from '@udev/schema';

/**
 * Represents the loaded configuration for a template.
 */
export type TemplateConfig = {
  /**
   * Absolute path to the template configuration file.
   *
   * This can also be the directory that the paths in the configuration are relative to.
   */
  path: string;

  /**
   * Actual configuration that can be loaded from a file.
   */
  template: Template;
};

/**
 * Values that will be applied to a template.
 */
export type TemplateValues = Record<string, TemplateValue>;

export type LoadedTemplateFile = {
  /**
   * Name of the template file. This will be used to generate the rendered file name.
   */
  name: string;

  /**
   * Absolute path to the template file.
   */
  path: string;

  /**
   * Contents of the template file. This will be used to generate the rendered file data.
   */
  data: string;
};

/**
 * Placeholder value that can be used to render a template.
 */
export type TemplatePlaceholderObject = Exclude<TemplatePlaceholder, string>;

export type LoadedTemplate = {
  /**
   * Name of the template
   */
  name: string;

  /**
   * Absolute file path to the template configuration
   */
  path: string;

  /**
   * Placeholder values used in templates.
   * These will be replace with values passed to the generator.
   */
  placeholders: Map<string, TemplatePlaceholderObject>;

  /**
   * Default properties used for the generated files
   */
  defaultValues: Partial<TemplateValues>;

  /**
   * Files that are a part of the template.
   */
  files: LoadedTemplateFile[];
};

export type RenderedTemplateFile = {
  /**
   * Template file used to render the file.
   */
  templateFile: LoadedTemplateFile;

  /**
   * Name of the rendered file.
   */
  name: string;

  /**
   * Contents of the rendered file.
   */
  data: string;
};

export type RenderedTemplate = {
  /**
   * Loaded template that was used.
   */
  template: LoadedTemplate;

  /**
   * Rendered files in the template.
   */
  files: RenderedTemplateFile[];

  /**
   * Values used to render the files.
   */
  values: TemplateValues;
};
