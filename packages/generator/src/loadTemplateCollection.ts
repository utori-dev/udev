import { readDirectorySync, DirectoryItem } from '@udev/fs';
import loadTemplate from './loadTemplate';
import toTemplatePlaceholderName from './toTemplatePlaceholderName';
import { Template, TemplateCollection, TemplatePlaceholderName } from './types';

export type LoadTemplateCollectionOptions = {
  placeholderName?: string | TemplatePlaceholderName;
};

function loadTemplateCollection(path: string, options: LoadTemplateCollectionOptions = {}): TemplateCollection {
  const { placeholderName: providedPlaceholderName = 'placeholder-name' } = options;
  const templates: Template[] = [];

  const addTemplates = (item: DirectoryItem): void => {
    if (item.type === 'file') templates.push(loadTemplate(item));
    if (item.entries) item.entries.forEach(addTemplates);
  };

  readDirectorySync(path, { recursive: true }).forEach(addTemplates);

  const placeholderName =
    typeof providedPlaceholderName === 'string'
      ? toTemplatePlaceholderName(providedPlaceholderName)
      : providedPlaceholderName;

  return { templates, path, placeholderName };
}

export default loadTemplateCollection;
