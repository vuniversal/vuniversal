<br>
<p align="center">
  <a href="https://github.surmon.me/vuniversal" target="_blank">
    <img src="https://raw.githubusercontent.com/surmon-china/vuniversal/master/presses/logo.png" width="195">
  </a>
</p>
<p align="center">Create vue (3) universal web applications quickly by <a href="https://github.com/vitejs">vite</a>.</p>
<br>
<p align="center">
  <a href="https://www.npmjs.com/package/vuniversa" target="_blank">
    <img src="https://nodei.co/npm/vuniversal.png?downloads=true&downloadRank=true&stars=true">
  </a>
</p>
<p align="center">
  <img src="https://img.shields.io/badge/MADE%20WITH-VUE-42a97a?style=for-the-badge&labelColor=35495d">
  <a href="https://github.com/surmon-china/vuniversal/stargazers" target="_blank">
    <img src="https://img.shields.io/github/stars/surmon-china/vuniversal.svg?style=for-the-badge">
  </a>
  <a href="https://www.npmjs.com/package/vuniversal" target="_blank">
    <img src="https://img.shields.io/npm/v/vuniversal?color=c7343a&label=npm&style=for-the-badge">
  </a>
  <a href="https://github.com/surmon-china/vuniversal/actions?query=workflow%3APublish" target="_blank">
    <img src="https://img.shields.io/github/workflow/status/surmon-china/vuniversal/Publish?label=publish&style=for-the-badge">
  </a>
  <a href="https://github.com/surmon-china/vuniversal/issues" target="_blank">
    <img src="https://img.shields.io/github/issues-raw/surmon-china/vuniversal.svg?style=for-the-badge">
  </a>
  <a href="https://github.com/surmon-china/vuniversal/blob/master/LICENSE" target="_blank">
    <img src="https://img.shields.io/github/license/mashape/apistatus.svg?style=for-the-badge">
  </a>
</p>


---

### Usage

``` bash
yarn add vuniversal

# init vun config file
npx vun init
```

**package.json**

```json
"scripts": {
  "dev": "vun",
  "build": "vun build",
  "test": "vun test",
  "lint": "eslint --ext .js,.ts,.vue src"
}
```

### Config

**vun.config.js**

```Ts
export interface VunLibConfig {
  universal: boolean
  modern: boolean
  clientEntry: string
  serverEntry: string
  template: string
  inspect: boolean
  prerender: false | {
    routes: string[]
    fallback: true | string
    options: object
  }
  lintOnSave: boolean | 'default' | 'warning' | 'error'
  dir: {
    build: string
    public: string
    source: string
    root: string
    modules: string[]
  }
  env: VunEnvObject
  dev: {
    host: string
    port: number
    verbose: boolean
    proxy: WebpackDevServer.ProxyConfigMap | WebpackDevServer.ProxyConfigArray
    devServer: WebpackDevServer.Configuration
  }
  build: {
    analyze: boolean | object
    publicPath: string
    assetsDir: string
    filenameHashing: boolean
    runtimeCompiler: boolean
    transpileDependencies: Array<string | RegExp>
    productionSourceMap: boolean
    parallel: boolean | number 
    crossorigin: false | '' | 'anonymous' | 'use-credentials'
    optimization: webpack.Configuration['optimization']
    css: {
      requireModuleExtension: boolean
      extract: boolean | {
        filename: string;
        chunkFilename: string
      }
      sourceMap: boolean
      styleResources: {
        scss: string[]
        sass: string[]
        less: string[]
        stylus: string[]
      }
    }
    loaders: {
      vue: LoaderOptions
      imgUrl: LoaderOptions
      fontUrl: LoaderOptions
      mediaUrl: LoaderOptions
      svgFile: LoaderOptions
      css: LoaderOptions
      scss: LoaderOptions
      sass: LoaderOptions
      less: LoaderOptions
      stylus: LoaderOptions
      postcss: LoaderOptions
      vueStyle: LoaderOptions
    }
  }
  babel: any
  webpack: ((config: webpack.Configuration, buildContext: BuildContext) => (webpack.Configuration | void))
  typescript: boolean | {
    tsLoader: Partial<TsLoaderOptions>
    forkTsChecker: boolean | Partial<ForkTsCheckerOptions>
  }
}
```

### Changelog

Detailed changes for each release are documented in the [release notes](https://github.com/surmon-china/vuniversal/blob/master/CHANGELOG.md).

### License

[MIT](https://github.com/surmon-china/vuniversal/blob/master/LICENSE)
