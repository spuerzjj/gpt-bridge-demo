import OpenAI from 'openai'
import { SocksProxyAgent } from 'socks-proxy-agent'
import { Readable } from 'stream'

let openai

function initOpenAI() {
	openai = new OpenAI({
		apiKey: process.env['OPENAI_API_KEY'] // This is the default and can be omitted
	})
}

export default class Chat {
	constructor(id) {
		this.id = id
		this.messages = []
	}

	async ask(msg) {
		this.messages.push({ role: 'user', content: msg })

		const s = new Readable({
			read() {
				console.log('读我')
			}
		})

		const stream = await openai.chat.completions.create(
			{
				messages: this.messages,
				model: 'gpt-3.5-turbo',
				stream: true
			},
			{
				httpAgent: new SocksProxyAgent('socks://127.0.0.1:7890')
			}
		)

		// 异步的往流里面推
		Promise.resolve().then(async () => {
			for await (const chunk of stream) {
				const end = chunk.choices[0].finish_reason === 'stop'
				if (end) {
					// 结束
					console.log('结束流')
					s.push(null)
				} else {
					s.push(chunk.choices[0]?.delta?.content || '')
				}
			}
		})

		// 返回一个流
		return s
	}

	clear() {
		this.messages = []
	}
}

export { initOpenAI }
