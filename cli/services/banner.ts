import chalk from 'chalk'
import wrapAnsi from 'wrap-ansi'
import prettyBytes from 'pretty-bytes'
import boxen, { BorderStyle } from 'boxen'
import { vunPackageJSON } from '@cli/configs/package'
import { NodeEnv, UniversalMode } from '../environment'
import { VUN_NAME } from '../paths'
import { linkText } from './logger'

// 80% of terminal column width
// this is a fn because console width can have changed since startup
const maxCharsPerLine = () => (process.stdout.columns || 100) * 80 / 100

function indent(count: number, chr = ' ') {
  return chr.repeat(count)
}

function foldLines(string: string, spaces: number, firstLineSpaces: number, charsPerLine = maxCharsPerLine()) {
  const lines = wrapAnsi(string, charsPerLine).split('\n')
  let result = ''
  if (lines.length) {
    const i0 = indent(firstLineSpaces === undefined ? spaces : firstLineSpaces)
    result = i0 + lines.shift()
  }
  if (lines.length) {
    const i = indent(spaces)
    result += '\n' + lines.map(l => i + l).join('\n')
  }
  return result
}

export default function bannerBox(message: string, title?: string, options?: boxen.Options) {
  const content = [title || chalk.white(`${VUN_NAME} Message`)]
  if (!!message) {
    content.push(
      '',
      chalk.white(foldLines(message, 0, 0, maxCharsPerLine()))
    )
  }

  return boxen(
    content.join('\n'),
    {
      borderColor: 'white',
      borderStyle: BorderStyle.Round,
      padding: 1,
      margin: 1,
      ...options
    }
  ) + '\n'
}

export function success(message: string, title?: string) {
  return bannerBox(message, title || chalk.green(`✔ ${VUN_NAME} Success`), {
    borderColor: 'green'
  })
}

export function warning(message: string, title?: string) {
  return bannerBox(message, title || chalk.yellow(`⚠ ${VUN_NAME} Warning`), {
    borderColor: 'yellow'
  })
}

export function error(message: string, title?: string) {
  return bannerBox(message, title || chalk.red(`✖ ${VUN_NAME} Error`), {
    borderColor: 'red'
  })
}

export interface IHeadBannerOptions {
  univservalMode?: UniversalMode
  command?: string
  memory?: boolean
  runningIn?: string
  listeningOn?: string
}

export function headBanner(options: IHeadBannerOptions = {}) {
  const messages = []
  const titles = [
    `${chalk.green.bold(VUN_NAME)} v${chalk(vunPackageJSON.version)}`,
    ''
  ]

  // Execute command
  if (options.command) {
    titles.push(`Execute ${chalk.green.bold(options.command)}`)
  }

  if (options.runningIn) {
    // Running mode
    const environment = !options.runningIn
      ? ''
      : options.runningIn === NodeEnv.Development
        ? chalk.green.bold(NodeEnv.Development)
        : chalk.green.bold(NodeEnv.Production)
    const runningMode = environment && `Running in ${environment} mode`
    // Univserval mode
    const univservalMode = options.univservalMode
      ? ` (${chalk.green.bold(options.univservalMode)})`
      : ''
    titles.push(runningMode + univservalMode)
  }

  // Memory
  if (options.memory) {
    // https://nodejs.org/api/process.html#process_process_memoryusage
    const { heapUsed, rss } = process.memoryUsage()
    titles.push(`Memory usage: ${chalk.green.bold(prettyBytes(heapUsed))} (RSS: ${prettyBytes(rss)})`)
  }

  // Listeners
  if (options.listeningOn) {
    messages.push(`Listening on: ${linkText(options.listeningOn)}`)
  }

  process.stdout.write(success(
    messages.length ? messages.join('\n') : '',
    titles.join('\n')
  ))
}
