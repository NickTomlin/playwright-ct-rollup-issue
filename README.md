```
# node 18+
npm i

# build (should succeed)
npm run build

# this should fail with an error
npm run test-ct
```


# Error

```
RollupError: node_modules/@valtown/codemirror-ts/dist/esm/autocomplete/getAutocompletion.js (1:7): "default" is not exported by "node_modules/typescript/lib/typescript.js", imported by "node_modules/@valtown/codemirror-ts/dist/esm/autocomplete/getAutocompletion.js".

file: /<path>typescript-import-issue/node_modules/@valtown/codemirror-ts/dist/esm/autocomplete/getAutocompletion.js:1:7

1: import ts from "typescript";
          ^
2: import { AUTOCOMPLETION_SYMBOLS } from "./symbols.js";
3: import { DEFAULT_CODEMIRROR_TYPE_ICONS } from "./icons.js";
```
