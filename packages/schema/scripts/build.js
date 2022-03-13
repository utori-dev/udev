const fs = require('fs');
const path = require('path');
const { compileFromFile } = require('json-schema-to-typescript');

/** Regular expression that matches a file name ending in `.schema.json`. */
const schemaFileEnding = /\.schema\.json$/;

/** Root directory of the schema package. */
const packageRoot = path.dirname(__dirname);

/** Source directory of the schema package. */
const src = path.join(packageRoot, 'src');

/** Dist directory of the schema package. */
const dist = path.join(packageRoot, 'dist');

/**
 * Schemas that will be built into type definition files.
 */
const schemas = fs.readdirSync(src, { withFileTypes: true }).map((item) => {
  if (!item.isFile()) {
    throw new Error(`'${src}' has an item ('${item.name}') that is not a file. This is not supported.`);
  }

  if (!item.name.match(schemaFileEnding)) {
    throw new Error(`All items in '${src}' should end in '.schema.json', but '${item.name}' does not.`);
  }

  const schema = item.name;
  const source = path.join(src, schema);

  return { schema, source };
});

if (!fs.existsSync(dist)) fs.mkdirSync(dist);

// Load all of the schema type definitions so we can combine them into one file.
Promise.all(schemas.map(({ source }) => compileFromFile(source, { bannerComment: '', cwd: src }))).then(
  // We'll want to combine all of the schema definitions together and write to the types entry file.
  (definitions) => {
    // Write the entry file for the type definitions.
    const entry = path.join(dist, 'index.d.ts');
    fs.writeFileSync(entry, definitions.join('\n'));
  }
);
