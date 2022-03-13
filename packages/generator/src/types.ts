import { TemplateValue, TemplatePlaceholder } from '@udev/schema';

export type TemplateValues = {
  name: string;
  [key: string]: TemplateValue;
};

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

export type LoadedTemplatePlaceholder = Exclude<TemplatePlaceholder, string>;

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
   * Placeholder values used in templates. These will be replace with values passed to the generator.
   */
  placeholders: {
    name: LoadedTemplatePlaceholder;
    [k: string]: LoadedTemplatePlaceholder;
  };

  /**
   * Default properties used for the generated files
   */
  defaultValues: Partial<TemplateValues>;

  /**
   * Files that are a part of the template.
   */
  files: LoadedTemplateFile[];
};

export type RenderedFile = {
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
   * Rendered files in the template.
   */
  files: RenderedFile[];

  /**
   * Values used to render the files.
   */
  values: TemplateValues;
};
