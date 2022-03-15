import replaceTemplatePlaceholder from './replaceTemplatePlaceholder';
import { LoadedTemplateFile, RenderedTemplateFile, TemplatePlaceholderObject, TemplateValues } from './types';

type RenderTemplateFileOptions = {
  /**
   * Template file being rendered.
   */
  templateFile: LoadedTemplateFile;

  /**
   * Values that will replace the placeholder values in the template.
   */
  values: TemplateValues;

  /**
   * Placeholder values in the template file's name and data.
   */
  placeholders: Map<string, TemplatePlaceholderObject>;

  /**
   * Data to use as the template file data.
   *
   * This is used if another tool has already partially rendered the template file.
   *
   * @default templateFile.data
   */
  data?: string;

  /**
   * Name to use as the template file name.
   *
   * This is used if another tool has already partially rendered the template file.
   *
   * @default templateFile.name
   */
  name?: string;
};

/**
 * Render a template by replacing the placeholder values with specific values for the file.
 *
 * @param options
 * @returns
 */
function renderTemplateFile(options: RenderTemplateFileOptions): RenderedTemplateFile {
  const { templateFile, values, placeholders, data = templateFile.data, name = templateFile.name } = options;

  const rendered: RenderedTemplateFile = {
    name,
    data,
    templateFile,
  };

  Object.entries(values).forEach(([key, value]) => {
    const placeholder = placeholders.get(key);
    if (!placeholder) return;

    // Update the placeholder values with  .
    rendered.name = replaceTemplatePlaceholder({ templateData: rendered.name, value, placeholder });
    rendered.data = replaceTemplatePlaceholder({ templateData: rendered.data, value, placeholder });
  });

  return rendered;
}

export default renderTemplateFile;
