// import fs from 'fs-extra'
import path from 'path'
import WebpackDevServer from 'webpack-dev-server'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import getWebpackConfig from '../../configs/webpack'
import { defaultDevServerConfig } from '../../configs/dev-server'
import { resolveAppRoot } from '../../../base/paths'
import { NodeEnv, VueEnv } from '../../../base/environment'
import { compileConfig, compilerToPromise, getDevServerUrl } from '../../configs/webpack/helper'
import { success as successNotifier } from '../../services/notifier'
import vunConfig from '../../../base/config'
import logger from '../../services/logger'

export function startSPAServer() {
  const buildContext = { target: VueEnv.Client, environment: NodeEnv.Development }
  const clientConfig = getWebpackConfig(buildContext)

  clientConfig.plugins?.push(new HtmlWebpackPlugin({
    inject: false,
    minify: false,
    chunks: 'all',
    filename: resolveAppRoot(path.resolve(vunConfig.dir.build, 'index.html')),
    // template: vunConfig.template,
    templateContent({ htmlWebpackPlugin }) {
      // console.log('---------vunConfig', vunConfig)
      // console.log('---------htmlWebpackPlugin', htmlWebpackPlugin)
      // @ts-ignore
      return vunConfig.templateRender({
        ...buildContext,
        assets: {
          js: htmlWebpackPlugin.files.js,
          css: htmlWebpackPlugin.files.css
        }
      })
    }
  }))

  const clientCompiler = compileConfig(clientConfig)
  const devServerConfig: WebpackDevServer.Configuration = {
    ...defaultDevServerConfig,
    port: vunConfig.dev.port,
    historyApiFallback: true,
    open: true
  }

  // https://webpack.docschina.org/configuration/dev-server
  WebpackDevServer.addDevServerEntrypoints(clientConfig, devServerConfig)
  const server = new WebpackDevServer(clientCompiler, devServerConfig)

  compilerToPromise(clientCompiler, VueEnv.Client).then(() => {
    server.listen(vunConfig.dev.port, vunConfig.dev.host, error => {
      if (error) {
        logger.br()
        logger.error('Dev server run failed: ', error)
      } else {
        const serverUrl = getDevServerUrl(vunConfig.dev.host, vunConfig.dev.port)
        successNotifier(serverUrl)
        logger.done(`Your application is running at: ${serverUrl}`)
      }
    })
  }).catch(error => {
    logger.error(`Failed to compile.`, error)
  })
}