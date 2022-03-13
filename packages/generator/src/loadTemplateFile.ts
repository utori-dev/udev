import { DirectoryItem, readFileSync, ReadFileSyncOptions } from '@udev/fs';
import { LoadedTemplateFile } from './types';

function loadTemplateFile(item: DirectoryItem, options: ReadFileSyncOptions = {}): LoadedTemplateFile {
  const { name, path } = item;

  const data = readFileSync(path, options);

  return {
    name,
    path,
    data,
  };
}

export default loadTemplateFile;
