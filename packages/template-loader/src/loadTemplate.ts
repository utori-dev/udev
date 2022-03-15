import { readDirectorySync, DirectoryItem } from '@udev/fs';
import { Template } from '@udev/schema';
import loadTemplateFile from './loadTemplateFile';
import toTemplatePlaceholderObject from './toTemplatePlaceholderObject';
import { LoadedTemplate, LoadedTemplateFile } from './types';

/**
 * Load a template from a configuration file.
 *
 * @param template
 * @returns
 */
function loadTemplate(config: Template): LoadedTemplate {
  const { name, defaultValues = {}, directory } = config;
  const files: LoadedTemplateFile[] = [];

  const addTemplates = (item: DirectoryItem): void => {
    if (item.type === 'file') files.push(loadTemplateFile(item));
    if (item.entries) item.entries.forEach(addTemplates);
  };

  readDirectorySync(directory, { recursive: true }).forEach(addTemplates);

  const placeholders: LoadedTemplate['placeholders'] = new Map();

  Object.entries(config.placeholders).forEach(([key, placeholder]) => {
    placeholders.set(key, toTemplatePlaceholderObject(placeholder));
  });

  return { name, files, defaultValues, path: directory, placeholders };
}

export default loadTemplate;
