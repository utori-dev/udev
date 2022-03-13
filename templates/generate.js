#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { kebabCase } = require('lodash');
const { generateFiles } = require('@udev/generator');

require('yargs')
  .scriptName('generate')
  .usage('Usage: $0 <command> [..args]')
  .command(
    'function',
    'Generate a new function',
    {
      package: {
        describe: 'Name of the package where the function should be added',
        alias: 'p',
        type: 'string',
        group: 'Template Options:',
        require: true,
      },
      name: {
        describe: 'Name of the new function',
        alias: 'n',
        type: 'string',
        group: 'Template Options:',
        require: true,
      },
      description: {
        describe: 'Description of the new function',
        alias: 'd',
        type: 'string',
        group: 'Template Options:',
        default: '@todo Add description',
      },
      path: {
        describe: 'Location in the package where the function should be added',
        type: 'string',
        group: 'Template Options:',
        default: 'src/',
      },
    },
    (args) => {
      const { package, name, description, path: functionPath } = args;

      const packageName = package.startsWith('@udev/') ? package.slice(6) : package;
      const packageDirectory = path.join(path.dirname(__dirname), 'packages', kebabCase(packageName));
      if (!fs.existsSync(packageDirectory)) {
        throw new Error(`Cannot resolve package '${package}' because '${packageDirectory}' does not exist.`);
      }

      const template = path.join(__dirname, 'function.template.json');
      const output = path.join(packageDirectory, functionPath);

      generateFiles({ template, output, values: { name, description } });
    }
  )
  .command(
    'package',
    'Generate a new @udev package',
    {
      name: {
        describe: 'Name of the new package',
        alias: 'n',
        type: 'string',
        group: 'Template Options:',
        require: true,
      },
      description: {
        describe: 'Description of the new package',
        alias: 'd',
        type: 'string',
        group: 'Template Options:',
        default: 'Auto-generated @udev tool',
      },
    },
    (args) => {
      const { name, description } = args;
      const template = path.join(__dirname, 'package.template.json');
      const output = path.join(path.dirname(__dirname), 'packages', kebabCase(name));
      generateFiles({ template, output, values: { name, description } });
    }
  )
  .help()
  .version(false)
  .strict()
  .demandCommand()
  .epilog('Copyright 2022').argv;
