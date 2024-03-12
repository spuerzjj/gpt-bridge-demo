import Koa from 'koa'
import router from './router/index.js'
import bodyParser from 'koa-bodyparser'
import ip from 'ip'
import cors from 'koa2-cors'
import { initOpenAI } from './chatgpt/Chat.js'
import * as dotenv from 'dotenv'
const pathsDotenv = '.env'
dotenv.config({ path: `${pathsDotenv}.local` }) // 加载.env.local
dotenv.config({ path: `${pathsDotenv}` })

initOpenAI()

const app = new Koa()
app.use(cors())

// 解析请求参数
app.use(
	bodyParser({
		enableTypes: ['json', 'form', 'text']
	})
)

app.use(router.routes())
app.use(router.allowedMethods())

const HOST = '0.0.0.0'
const PORT = 9999
console.log(process.env.SOCKS_PROXY_AGENT)
app.listen(PORT, HOST, () => {
	console.log(`app listening on http://localhost:${PORT}`)
	console.log(`                 http://${ip.address()}:${PORT}`)
})
