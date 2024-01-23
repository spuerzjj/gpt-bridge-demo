import Koa from 'koa'
import router from './router/index.js'
import bodyParser from 'koa-bodyparser'
import ip from 'ip'
import cors from 'koa2-cors'

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

app.listen(PORT, HOST, () => {
	console.log(`app listening on http://localhost:${PORT}`)
	console.log(`                 http://${ip.address()}:${PORT}`)
})
