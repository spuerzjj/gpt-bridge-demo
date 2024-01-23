import Router from '@koa/router'
import Chat from '../chatgpt/Chat.js'

const router = new Router()
const chatMap = new Map()

router.post('/chat', async (ctx, next) => {
	const id = ctx.request.body.id
	const msg = ctx.request.body.content

	let chat
	if (chatMap.has(id)) {
		chat = chatMap.get(id)
	} else {
		chat = new Chat(id)
		chatMap.set(id, chat)
	}

	ctx.type = 'text/plain'
	ctx.body = chat.ask(msg)
})

router.get('/clear', async (ctx, next) => {
	const id = ctx.request.query.id
	console.log(id)
	if (id && chatMap.has(id)) {
		console.log('清空')
		const chat = chatMap.get(id)
		chat.clear()
	}

	// ctx.type = ''
	ctx.body = { success: true }
})

export default router
