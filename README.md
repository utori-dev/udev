# `@udev` Tools

## `udev` CLI

The primary package of this monorepo will be the `udev` CLI tool.
This tool will help manage a vanilla NPM monorepo.

| Command               | Description                                             | Libraries                            |
| --------------------- | ------------------------------------------------------- | ------------------------------------ |
| `audit dependencies`  | Audit dependencies.                                     |                                      |
| `audit docs`          | Audit links and spelling in markdown files.             | `@udev/markdown`                     |
| `audit licenses`      | Audit license files.                                    | `@udev/license-util`                 |
| `format config`       | Format order of properties in JSON configuration files. |                                      |
| `format docs`         | Format markdown files within the monorepo.              | `@udev/markdown`                     |
| `generate <template>` | Generate new packages and code from templates.          | `@udev/generator`                    |
| `goodbye`             | Remove `udev.*.json` files from the monorepo.           |                                      |
| `init`                | Initialize `udev.*.json` files and add `udev`.          |                                      |
| `nuke all`            | Remove all untracked files for a fresh state.           | `@udev/local`                        |
| `nuke cache`          | Clear the local cache.                                  | `@udev/cache`                        |
| `publish`             | Publish packages.                                       | `@udev/publisher`                    |
| `run <script-name>`   | Run NPM scripts or configured commands with caching.    | `@udev/cache`, `@udev/script-runner` |
| `ui`                  | Start app for managing the monorepo.                    | `@udev/ui`                           |
| `symlink`             | Create a symbolic link.                                 | `@udev/symlinker`                    |
| `update config`       | Update package configuration files.                     |                                      |
| `update dependencies` | Update dependency versions.                             |                                      |
| `update docs --links` | Add missing link references to any markdown files.      | `@udev/markdown`                     |
| `update licenses`     | Update license files for packages in the monorepo.      | `@udev/license-util`                 |
| `update scripts`      | Update package scripts.                                 |                                      |
| `update types`        | Update paths and references in base `tsconfig.json`.    |                                      |
| `update versions`     | Update package versions throughout a monorepo.          |                                      |
| `update workspaces`   | Update order of workspaces in root `package.json`.      |                                      |
| `validate cache`      | Validate local cache state.                             | `@udev/cache`                        |
| `validate config`     | Validate configurations within a monorepo.              |                                      |
| `validate dictionary` | Validate dictionary configurations.                     | `@udev/dictionary`                   |

All commands will use the `@udev/config`, `@udev/fs`, `@udev/logger`, and `@udev/monorepo-loader` tools.

This tool will be designed to be removable.
What does this mean?

The only differences between a `@udev` monorepo and a vanilla NPM monorepo will be:

- A `devDependency` to `@udev/cli` in the root package.
- A `udev.monorepo.json` in the root directory.
- Directory (or directories) of generators containing templates. These will contain `udev.generator.json` files.
- Potentially some `udev.package.json` in individual packages.

If the `goodbye` command is executed, the monorepo should still work as before.
This gives the user flexibility to migrate away from `@udev/cli` if they ever feel the need to do so.
This will also make it easier for users to add `@udev/cli` to a monorepo.

## Libraries

Priorities are graded from `A+` to `D-`. Packages with the priority `Stretch` are considered stretch goals.

| Name                    | Description                                           | Priority | Dependencies                                        |
| ----------------------- | ----------------------------------------------------- | -------- | --------------------------------------------------- |
| `@udev/cache`           | Handle caching.                                       | C-       | `@udev/fs`, `@udev/schema`, `@udev/validate-schema` |
| `@udev/config`          | Read and write configuration files.                   | A        | `@udev/fs`, `@udev/schema`                          |
| `@udev/dictonary`       | Access dictionaries for localized strings.            | B        | `@udev/fs`, `@udev/schema`                          |
| `@udev/flags`           | Utilities for feature flagging.                       | Stretch  |                                                     |
| `@udev/fs`              | Extension of NodeJS `fs` and `path` tools.            | A+       |                                                     |
| `@udev/generator`       | Generate files from templates.                        | A+       | `@udev/fs`, `@udev/templates`                       |
| `@udev/ui`              | UI for managing the monorepo.                         | B-       | `@udev/config`, `@udev/monorepo-loader`             |
| `@udev/license-util`    | Utilities for managing package licenses.              | Stretch  | `@udev/fs`                                          |
| `@udev/local`           | Get information on the local system.                  | D-       | `@udev/fs`                                          |
| `@udev/logger`          | Handle logging.                                       | B        |                                                     |
| `@udev/markdown`        | Utilities for processing Markdown files.              | C+       |                                                     |
| `@udev/monorepo-loader` | Load a monorepo's workspaces and dependencies.        | A+       | `@udev/config`, `@udev/fs`, `@udev/schema`          |
| `@udev/publisher`       | Publish NPM packages.                                 | C+       | `@udev/fs`                                          |
| `@udev/schema`          | The schema for all `udev.*.json` files.               | A+       |                                                     |
| `@udev/script-runner`   | Run scripts and commands using the repository `.bin`. | B        | `@udev/config`, `@udev/fs`                          |
| `@udev/symlinker`       | Create symbolic links.                                | D        | `@udev/fs`                                          |
| `@udev/templates`       | Process templates. (wrapper)                          | A        |                                                     |

### `@udev/config`

Read and write `udev.*.json` configurations.

Other configurations may also be supported.
Possible configurations include:

- TypeScript configs
- Jest configs
- Prettier configs
- ESLint configs
- `package.json` files
- Webpack configs

### `@udev/dictionary`

Access localized strings from a dictionary for user messages.

### `@udev/ui`

Web app for managing the monorepo.

Will include the following features:

- Graph of dependencies
- Editing of configuration settings
- Executing commands

### `@udev/fs`

Extension of NodeJs `fs`.

Includes support for globs, reading JSON files, and (maybe) validating schemas.

### `@udev/monorepo-loader`

Loads the monorepo so that it can be easily analyzed.

### `@udev/schema`

This package will contain schemas for `udev.monorepo.json`, `udev.generator.json`,
`udev.package.json`, and any other `udev.*.json` files.
