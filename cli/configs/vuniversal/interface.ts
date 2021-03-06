import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'
import WebpackBundleAnalyzer from 'webpack-bundle-analyzer'
import { Options as TsLoaderOptions } from 'ts-loader'
import { Options as ForkTsCheckerOptions } from 'fork-ts-checker-webpack-plugin'
import { VueEnv } from '@cli/environment'

export interface VunEnvObject {
  [key: string]: any
}

interface LoaderOptions {
  [key: string]: any
}

type BuildContext = {
  target: VueEnv
}

type RecursivePartial<T> = {
  [P in keyof T]?:
    T[P] extends (infer U)[] ? RecursivePartial<U>[] :
    T[P] extends object ? RecursivePartial<T[P]> :
    T[P]
}

// For user
export type VuniversalConfig = RecursivePartial<VunLibConfig>
// For vun
export interface VunLibConfig {
  // 是否 SSR
  universal: boolean
  // 是否 modern
  modern: boolean
  // 客户端入口
  clientEntry: string
  // 服务端入口
  serverEntry: string
  // 模板
  template: string
  // 是否打印 webpack 配置
  inspect: boolean
  // 转换配置
  prerender: false | {
    // 需要转换的路由
    routes: string[]
    // 是否回退为 SPA
    fallback: true | string
    // options of https://github.com/chrisvfritz/prerender-spa-plugin
    options: object
  }
  // Eslint
  lintOnSave: boolean | 'default' | 'warning' | 'error'
  // 目录配置
  dir: {
    // 构建出的路径
    build: string
    // 静态资源路径
    public: string
    // 项目源码路径
    source: string
    // 项目根目录
    root: string
    // node_modules 路径
    modules: string[]
  }
  // 环境配置
  env: VunEnvObject
  dev: {
    // 端口地址
    host: string
    port: number
    // 各种信息
    verbose: boolean
    // 代理
    proxy: WebpackDevServer.ProxyConfigMap | WebpackDevServer.ProxyConfigArray
    // webpack dev server
    devServer: WebpackDevServer.Configuration
  }
  build: {
    // 统计配置
    analyze: boolean | WebpackBundleAnalyzer.BundleAnalyzerPlugin.Options
    // CDN PATH
    publicPath: string
    // 输出的 assets 文件夹，相对于 build 的路径
    assetsDir: string
    // 默认情况下，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存
    filenameHashing: boolean
    // 是否包含运行时编译
    runtimeCompiler: boolean
    // 默认情况下 babel-loader 会忽略所有 node_modules 中的文件。如果你想要通过 Babel 显式转译一个依赖，可以在这个选项中列出来
    transpileDependencies: Array<string | RegExp>
    // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
    productionSourceMap: boolean
    // 是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建。
    parallel: boolean | number 
    html: {
      // https://cli.vuejs.org/zh/config/#crossorigin
      crossorigin: false | '' | 'anonymous' | 'use-credentials'
      preload: boolean | 'preload' | 'prefetch' | 'auto'
      // TODO
      ext: any
    },
    // webpack optimization
    optimization: webpack.Configuration['optimization']
    // 有关样式的配置项
    css: {
      // 默认情况下，只有 *.module.[ext] 结尾的文件才会被视作 CSS Modules 模块。设置为 false 后你就可以去掉文件名中的 .module 并将所有的 *.(css|scss|sass|less|styl(us)?) 文件视为 CSS Modules 模块。
      requireModuleExtension: boolean
      // mini-css-extract-plugin options
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
  babel: object | ((buildContext: BuildContext) => object)
  webpack: webpack.Configuration | ((config: webpack.Configuration, buildContext: BuildContext) => (webpack.Configuration | void))
  typescript: boolean | {
    tsLoader: Partial<TsLoaderOptions>
    forkTsChecker: boolean | Partial<ForkTsCheckerOptions>
  }
}
