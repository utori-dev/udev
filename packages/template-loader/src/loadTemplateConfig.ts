import * as path from 'path';
import { readJsonSync } from '@udev/fs';
import { Template } from '@udev/schema';

/**
 * Load a template configuration file.
 *
 * @param template
 * @todo FUTURE - Add validation.
 *
 * @returns
 */
function loadTemplateConfig(template: string): Template {
  const { directory: relativeDirectory, ...config } = readJsonSync<Template>(template);
  const directory = path.join(path.dirname(template), relativeDirectory);

  return {
    directory,
    ...config,
  };
}

export default loadTemplateConfig;
