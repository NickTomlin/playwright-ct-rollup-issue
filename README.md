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

## Thoughts so far

- Compilation works with "normal" vite and even programmatic usage of vite via `vanilla-build.js` and `vanilla-build.mjs`
- It seems to be due to how [Playwright configures and uses vite](https://github.com/microsoft/playwright/blob/c921c38737cbd630b330d5e22adbab712b12afe1/packages/playwright-ct-core/src/vitePlugin.ts#L185-L188)
    - My bet is something about the plugin configuration is strange here. If I comment out the playwright plugin I do not see this error
    - OR it's a module system interop around how playwright is launching?
- Hacking / patching the `getAutocompletion` file (and all other files) can work around the `RollupError`, but that runs into runtime issues where the module is resolved incorrectly
- Using `import * as ts from "typescript"` does not work (the values are missing at runtime) and the same happens with `const ts = await import("typescript")`
    - I _think_ this is due to the fact that `typescript` is built for interop with `NodeNext` and the format causes issue with `rollup` but I don't know enough there to be sure



### Playwright's vite config

```json5
{
  root: '<path>/typescript-import-issue/playwright',
  configFile: false,
  publicDir: '<path>/typescript-import-issue/public',
  define: { __VUE_PROD_DEVTOOLS__: true },
  css: { devSourcemap: true },
  build: {
    outDir: '<path>/typescript-import-issue/playwright/.cache',
    target: 'esnext',
    minify: false,
    sourcemap: true
    rollupOptions: {
      treeshake: false,
        input: {
            index: '<path>/typescript-import-issue/playwright/index.html'
        }
    },
  },
  preview: { https: undefined, host: 'localhost', port: 3100 },
  server: { https: undefined, host: 'localhost', port: 3100 },
  appType: 'mpa',
  plugins: [
    [ [Object], [Object] ],
    {
      name: 'playwright:component-index',
      configResolved: [Function: configResolved],
      transform: [AsyncFunction: transform],
      writeBundle: [AsyncFunction: writeBundle]
    }
  ]
}
```

Using this config (without plugins) allows the `vanilla-build.js` to pass. Commenting out the plugin within the `playwright-ct` node module also allows the build to complete.
