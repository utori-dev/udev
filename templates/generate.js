#!/usr/bin/env node

const path = require('path');
const { kebabCase } = require('lodash');
const { generateFiles } = require('@udev/generator');

require('yargs')
  .scriptName('generate')
  .usage('Usage: $0 <command> [..args]')
  .command(
    'package',
    'Simple tool to generate files',
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
      const template = path.join(__dirname, 'package');
      const output = path.join(path.dirname(__dirname), 'packages', kebabCase(name));
      generateFiles({ template, output, scope: { name, description } });
    }
  )
  .help()
  .version(false)
  .strict()
  .demandCommand()
  .epilog('Copyright 2022').argv;
