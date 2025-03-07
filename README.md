<h1 align="center">vite-plugin-sass-dts ⚡ Welcome 😀</h1>

<p align="left">
  <a href="https://github.com/actions/setup-node"><img alt="GitHub Actions status" src="https://github.com/activeguild/vite-plugin-sass-dts/workflows/automatic%20release/badge.svg" style="max-width:100%;"></a>
</p>

# vite-plugin-sass-dts

A plugin that automatically creates a type file when using the CSS module type-safely.

## Demo

<img src="https://user-images.githubusercontent.com/39351982/138745772-8b218863-fe28-4573-a86a-fc10a7ab1ac7.gif" width="600" />

## Install

```bash
npm i -D vite-plugin-sass-dts
```

## Options

| Parameter       | Type    | Description                                                                                                                                                                                                       |
| --------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| allGenerate     | boolean | Create all d.ts files of the css, sass, scss files included in the project at build time.<br />We recommend that you turn off the flag once you have created the d.ts file, as it will take a long time to build. |
| global.generate | boolean | Outputs the common style set in <b>additionalData</b> of <b>preprocessorOptions</b> as a global type definition file.                                                                                             |
| global.outFile  | string  | Specify the file that outputs the global common style with an absolute path.Relative paths will be supported.                                                                                                     |

## Add it to vite.config.ts

```ts
import { defineConfig } from 'vite'
import sassDts from 'vite-plugin-sass-dts'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [sassDts()],
})
```

## Usage

You can create a dts file by saving the scss file during development.
You can check the usage [example](https://github.com/activeguild/vite-plugin-sass-dts/tree/master/example) when the following options are set.
Prepare the vite.config.ts file with the following options and start it in development mode.

```ts
;[vite.config.ts]

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import sassDts from 'vite-plugin-sass-dts'
import path from 'path'

export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/styles" as common;`,
        importer(...args) {
          if (args[0] !== '@/styles') {
            return
          }

          return {
            file: `${path.resolve(__dirname, './src/assets/styles')}`,
          }
        },
      },
    },
  },
  plugins: [
    react(),
    sassDts({
      allGenerate: true,
      global: {
        generate: true,
        outFile: path.resolve(__dirname, './src/style.d.ts'),
      },
    }),
  ],
})
```

```bash
npm run dev
```

Then save the following file ...

```scss
[src/assets/styles/_index.scss] .row {
  display: flex;
}
```

```scss
[src/App.module.scss] .header-1 {
  background-color: common.$primary;
  &.active {
    background-color: black;
  }
}
```

Saving the scss file creates a d.ts file in the same hierarchy.

```ts
;[src / App.scss.d.ts]

import globalClassNames, { ClassNames as GlobalClassNames } from './style.d'
declare const classNames: typeof globalClassNames & {
  readonly 'header-1': 'header-1'
  readonly active: 'active'
}
export default classNames
export type ClassNames = 'header-1' | 'active' | GlobalClassNames
```

The type definition is output to the output path of the common style specified in the option.

```ts
;[src / style.d.ts]

declare const classNames: {
  readonly row: 'row'
}
export default classNames
export type ClassNames = 'row'
```

## Principles of conduct

Please see [the principles of conduct](https://github.com/activeguild/vite-plugin-sass-dts/blob/master/.github/CONTRIBUTING.md) when building a site.

## License

This library is licensed under the [MIT license](https://github.com/activeguild/vite-plugin-sass-dts/blob/master/LICENSE).
