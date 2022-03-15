import { LoadedTemplate, TemplateValues, RenderedTemplateFile, renderTemplateFile } from '@udev/template-loader';
import { Liquid } from 'liquidjs';
import createLiquidEngine from './createLiquidEngine';

export type RenderLiquidTemplateOptions = {
  template: LoadedTemplate;
  values: TemplateValues;
  engine?: Liquid;
};

/**
 * Function that uses a `Liquid` engine to render a `LoadedTemplate` with the provided `values`.
 *
 * @param options
 * @returns
 */
function renderLiquidTemplate(options: RenderLiquidTemplateOptions): Promise<RenderedTemplateFile[]> {
  const { template, values, engine = createLiquidEngine() } = options;
  const { placeholders } = template;

  return Promise.all(
    template.files.map((templateFile) =>
      engine
        .parseAndRender(templateFile.data, values)
        .then((data) => renderTemplateFile({ data, templateFile, placeholders, values }))
    )
  );
}

export default renderLiquidTemplate;
