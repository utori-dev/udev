import { DirectoryItem, readFileSync, ReadFileSyncOptions } from '@udev/fs';
import { Template } from './types';

function loadTemplate(item: DirectoryItem, options: ReadFileSyncOptions = {}): Template {
  const { name, path } = item;

  const data = readFileSync(path, options);

  return {
    name,
    path,
    data,
  };
}

export default loadTemplate;
