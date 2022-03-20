[Back to main README][udev_root]

# `@udev/template-loader`

This package provides utilities for loading and rendering template files.

These utilities are used by [@udev/generator][udev_generator],
but are packaged separately so they can be used without the generator project.

## Responsibilities

- Load a template configuration file matching the [`@udev` Template schema][udev_schema].
- Load a template from a configuration.
- Replace custom template placeholder values with actual values.

This library does not provide utilities for loading templates with templating syntax.
Processing template tags is intended to be done by the package using these utilities.

## Usage

### `loadTemplateConfig`

This function loads a template configuration from a path.
The `directory` value of the loaded configuration is also resolved to an absolute path.

In the future, this will be updated to include validation.

```typescript
const config = loadTemplateConfig('/foo/bar/your.template.json');
```

### `loadTemplate`

This function accepts a template configuration and loads the template with all its files.
This also processes all placeholder values.

In the future, this will be updated to include validation.

```typescript
const config = loadTemplateConfig('/foo/bar/your.template.json');
```

[udev_root]: ../../README.md
[udev_generator]: ../generator/README.md
[udev_schema]: ../schema/README.md
