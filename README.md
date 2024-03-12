# gpt-bridge-demo

## 项目概要

桥接openai提供的开放api，封装自己的ai服务

## 主要功能

- 服务端
1. 提供一个chat接口，传入id和content字段，id作为一次连续对话的id，content是单次发送的文本，以流的形式返回对话结果
2. 提供clear接口，传入id，情况一次连续对话的内容

- 客户端
1. 模仿gpt的页面，输入文本，调用chat接口，读取返回流向对话区域持续添加响应的文本，实现持续对话的效果

## 技术栈

- Koa
- 使用openai官方提供的库openai来调用gpt-3.5-turbo模型
- 向客户端响应Readable对象，实现数据流式传输

## 安装

如果您要运行这个demo，您需要
1. 申请一个openai的API keys，地址：https://platform.openai.com/api-keys
2. 用你的API key替换packages/gpt-server/.env中的OPENAI_API_KEY字段
3. 准备一个流量转发服务以保证你的流量可以到达openai的服务器，或者你的网络环境可以直达openai的服务器
4. 将你的转发服务地址替换掉.env文件中的SOCKS_PROXY_AGENT字段
5. pnpm install
6. cd packages/gpt-server
7. npm run dev
8. 客户端直接打开index.html文件即可


