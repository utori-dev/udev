import { LoadedTemplate, RenderedTemplate, RenderedTemplateFile, TemplateValues } from './types';
import renderTemplateFile from './renderTemplateFile';

export type RenderTemplateOptions = {
  /**
   * Template to render.
   */
  template: LoadedTemplate;

  /**
   * Values that will replace the placeholder values in the template files.
   */
  values: TemplateValues;
};

/**
 * Render the files in a template.
 *
 * @param template
 * @returns
 */

function renderTemplate(options: RenderTemplateOptions): RenderedTemplate {
  const { template, values } = options;
  const { placeholders } = template;

  const files: RenderedTemplateFile[] = template.files.map((templateFile) =>
    renderTemplateFile({ templateFile, placeholders, values })
  );

  return { template, values, files };
}

export default renderTemplate;
