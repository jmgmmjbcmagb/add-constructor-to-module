import { Rule, SchematicContext, Tree } from "@angular-devkit/schematics";

import { Schema } from "./schema";

const APP_MODULE_CLASS = "AppModule {";
const APP_MODULE_DIR = "./src/app/app.module.ts";

export function addConstructorToModule(_options: Schema): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const workspaceAsBuffer = tree.read(APP_MODULE_DIR);
    console.log(workspaceAsBuffer?.toString());
    if (workspaceAsBuffer != null) {
      const content = workspaceAsBuffer.toString();
      const appendIndex =
        content.indexOf(APP_MODULE_CLASS) + APP_MODULE_CLASS.length;
      const content2Append = `
  constructor() {
    console.log('${_options.consoleMensage}');
  }
`;
      const updatedContent =
        content.slice(0, appendIndex) +
        content2Append +
        content.slice(appendIndex);
      tree.overwrite(APP_MODULE_DIR, updatedContent);
    }
    return tree;
  };
}
