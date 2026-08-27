import { createServer } from 'vite'

const apiUrl = 'http://localhost:3001/api/health'
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms))

for (;;) {
  try {
    const response = await fetch(apiUrl)
    if (response.ok) break
  } catch {}
  await wait(250)
}

const server = await createServer()
await server.listen()
server.printUrls()
