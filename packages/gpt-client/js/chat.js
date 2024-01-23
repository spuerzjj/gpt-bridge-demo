const id = 'Zjj'

// 清空之前的聊天记录
fetch(`http://127.0.0.1:9999/clear?id=${id}`, {
	method: 'GET',
	headers: {
		'content-type': 'application/json'
	}
})

const form = document.querySelector('form')

form.addEventListener('submit', async e => {
	e.preventDefault()
	const content = textArea.value
	createUserContent('Z')
	const robot = createRobotContent()
	// 发送ajax请求
	const resp = await fetch('http://127.0.0.1:9999/chat', {
		method: 'POST',
		headers: {
			'content-type': 'application/json'
		},
		body: JSON.stringify({
			id,
			content
		})
	})
	// 头已经到达客户端，体还遥遥无期
	const reader = resp.body.getReader()
	const decoder = new TextDecoder()
	while (1) {
		const { done, value } = await reader.read()
		if (done) {
			break
		}
		const txt = decoder.decode(value)
		robot.append(txt)
	}
	robot.over()
})

const textArea = document.querySelector('textarea')
textArea.onkeydown = e => {
	if (e.key === 'Enter' && !e.ctrlKey && !e.shiftKey) {
		// 触发表单的提交事件
		e.preventDefault()
		form.dispatchEvent(new Event('submit'))
	}
}
