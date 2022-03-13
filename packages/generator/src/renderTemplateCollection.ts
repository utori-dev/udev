import { Liquid } from 'liquidjs';
import { LiquidOptions } from 'liquidjs/dist/liquid-options';
import toRenderedTemplate from './toRenderedTemplate';
import { RenderedTemplate, TemplateCollection, TemplateScope } from './types';

function renderTemplateCollection(
  collection: TemplateCollection,
  scope: TemplateScope,
  options: LiquidOptions = { cache: true }
): Promise<RenderedTemplate[]> {
  const engine = new Liquid(options);
  return Promise.all(
    collection.templates.map((template) =>
      engine
        .parseAndRender(template.data, scope)
        .then((data) => toRenderedTemplate({ data, scope, template, placeholderName: collection.placeholderName }))
    )
  );
}

export default renderTemplateCollection;
