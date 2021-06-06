/**
 * @Author       : shi-lai-mu <https://github.com/shi-lai-mu>
 * @Date         : 2021-06-06 15:16:29
 * @LastEditTime : 2021-06-06 23:25:27
 * @Description  : 服务端入口
 */

import http from 'http'
import koa from 'koa'
import KoaJson from 'koa-json'
import KoaStatic from 'koa-static'
import * as path from 'path'
import crossSpawn from 'cross-spawn'

export const PROT = (Math.abs(parseInt(process.env.PORT || '0', 10)) || null) ?? 3000
const app = new koa()
const server = http.createServer(app.callback()).listen(PROT)

// 注入 中间件
app.use(KoaJson())
app.use(KoaStatic(path.resolve()))
app.use(KoaStatic(path.join(__dirname, 'view')))

// 监听 事件
server.on('listening', onListening)
server.on('error', onError)

/**
 * HTTP listening EVENT
 */
function onListening() {
  if (!process.argv.includes('--noGulp')) {
    crossSpawn.sync('yarn', ['gulp'], { stdio: 'inherit' })
  } else {
    console.warn(`Listening on http://127.0.0.1:${PROT}`)
  }
}

/**
 * HTTP error EVENT
 */
function onError(err: Error & { port: string; code: string }) {
  const codeMessage: { [k: string]: string } = {
    EADDRINUSE: `端口 ${err.port} 被占用!`,
  }
  throw Error(codeMessage[err.code] ?? err.message)
}

export default app
