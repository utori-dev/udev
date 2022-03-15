import * as path from 'path';
import { writeFileSync } from '@udev/fs';
import { TemplateValues, RenderedTemplateFile, loadTemplateConfig, loadTemplate } from '@udev/template-loader';
import renderLiquidTemplate from './renderLiquidTemplate';

export type GenerateLiquidTemplateOptions = {
  /**
   * Path to the template configuration.
   */
  template: string;

  /**
   * Output directory for the generated files.
   */
  output: string;

  /**
   * Values to apply to the template.
   */
  values: TemplateValues;
};

/**
 * Function that generates
 *
 * @param options
 */
function generateLiquidTemplate(options: GenerateLiquidTemplateOptions): void {
  const { template: templateConfigPath, output, values } = options;
  const config = loadTemplateConfig(templateConfigPath);
  const template = loadTemplate(config);

  renderLiquidTemplate({ template, values }).then((renderedTemplates: RenderedTemplateFile[]) => {
    renderedTemplates.forEach((rendered) => {
      const filePath = path.join(output, rendered.name);
      writeFileSync(filePath, rendered.data);
    });
  });
}

export default generateLiquidTemplate;
