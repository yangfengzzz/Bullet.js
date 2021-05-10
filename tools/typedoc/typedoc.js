const fs = require("fs");
const path = require("path");

fs.rmdirSync(path.join(process.cwd(), "api"), { recursive: true });

module.exports = {
  name: "Oasis Engine",
  mode: "modules",
  out: `api/`,
  theme: "./node_modules/@oasis-engine/typedoc-theme/bin/default",
  ignoreCompilerErrors: true,
  preserveConstEnums: true,
  stripInternal: true,
  excludeProtected: true,
  "external-modulemap": "packages/([\\w\\-_]+)/",
  exclude: [
    "**/+(dev-packages|examples|typings)/**/*",
    "**/*test.ts",
    "packages/adapter-miniprogram/**/*",
    "packages/component-miniprogram/**/*",
    "packages/**/src/global.d.ts",
    "packages/**/shaderLib/global.d.ts",
    "scripts/**/*"
  ],
  plugin: ["@strictsoftware/typedoc-plugin-monorepo", "typedoc-plugin-remove-references"]
};
