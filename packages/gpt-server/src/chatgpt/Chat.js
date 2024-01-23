import OpenAI from 'openai'
import { SocksProxyAgent } from 'socks-proxy-agent'
import { Readable } from 'stream'

const openai = new OpenAI({
	// apiKey: process.env['OPENAI_API_KEY'] // This is the default and can be omitted
	apiKey: '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'
})

export default class Chat {
	constructor(id) {
		this.id = id
		this.messages = []
	}

	ask(msg) {
		this.messages.push({ role: 'user', content: msg })
		console.log(this.messages)
		let _this = this
		const s = new Readable({
			async read() {
				const stream = await openai.chat.completions.create(
					{
						messages: _this.messages,
						model: 'gpt-3.5-turbo',
						stream: true
					},
					{
						httpAgent: new SocksProxyAgent('socks://127.0.0.1:7890')
					}
				)
				for await (const chunk of stream) {
					const end = chunk.choices[0].finish_reason === 'stop'
					if (end) {
						// 结束
						this.push(null)
					} else {
						this.push(chunk.choices[0]?.delta?.content || '')
					}
				}
			}
		})
		return s
	}

	clear() {
		this.messages = []
	}
}
