import * as path from 'path';
import { writeFileSync } from '@udev/fs';

import loadTemplateCollection from './loadTemplateCollection';
import renderTemplateCollection from './renderTemplateCollection';
import { RenderedTemplate, TemplateScope } from './types';

export type GenerateFileOptions = {
  template: string;
  output: string;
  scope: TemplateScope;
};

function generateFiles(options: GenerateFileOptions): void {
  const { template: templateDirectory, output, scope } = options;
  const templates = loadTemplateCollection(templateDirectory);

  renderTemplateCollection(templates, scope).then((renderedTemplates: RenderedTemplate[]) => {
    renderedTemplates.forEach((rendered) => {
      const filePath = path.join(output, rendered.name);
      writeFileSync(filePath, rendered.data);
    });
  });
}

export default generateFiles;
