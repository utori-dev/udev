import * as path from 'path';
import { readDirectorySync, DirectoryItem, readJsonSync } from '@udev/fs';
import { Template } from '@udev/schema';
import loadTemplateFile from './loadTemplateFile';
import loadTemplatePlaceholder from './loadTemplatePlaceholder';
import { LoadedTemplate, LoadedTemplateFile } from './types';

function loadTemplate(template: string): LoadedTemplate {
  const config = readJsonSync<Template>(template);
  const files: LoadedTemplateFile[] = [];

  const addTemplates = (item: DirectoryItem): void => {
    if (item.type === 'file') files.push(loadTemplateFile(item));
    if (item.entries) item.entries.forEach(addTemplates);
  };

  const directory = path.join(path.dirname(template), config.directory);

  readDirectorySync(directory, { recursive: true }).forEach(addTemplates);

  const placeholders: LoadedTemplate['placeholders'] = {
    name: loadTemplatePlaceholder(config.placeholders.name),
  };

  Object.entries(config.placeholders).forEach(([key, placeholder]) => {
    if (key === 'name') return;
    placeholders[key] = loadTemplatePlaceholder(placeholder);
  });

  const { name, defaultValues = {} } = config;

  return { name, files, defaultValues, path: template, placeholders };
}

export default loadTemplate;
