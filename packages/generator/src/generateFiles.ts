import * as path from 'path';
import { writeFileSync } from '@udev/fs';

import loadTemplate from './loadTemplate';
import renderTemplate from './renderTemplate';
import { RenderedFile, TemplateValues } from './types';

export type GenerateFileOptions = {
  template: string;
  output: string;
  values: TemplateValues;
};

function generateFiles(options: GenerateFileOptions): void {
  const { template: templateDirectory, output, values } = options;
  const templates = loadTemplate(templateDirectory);

  renderTemplate(templates, values).then((renderedTemplates: RenderedFile[]) => {
    renderedTemplates.forEach((rendered) => {
      const filePath = path.join(output, rendered.name);
      writeFileSync(filePath, rendered.data);
    });
  });
}

export default generateFiles;
