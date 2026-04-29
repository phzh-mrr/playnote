import test from 'node:test'
import assert from 'node:assert/strict'
import { createApp } from '../src/app.js'

test('GET /api/health returns ok', async () => {
  const app = createApp()
  const server = app.listen(0)

  await new Promise((resolve, reject) => {
    server.once('listening', resolve)
    server.once('error', reject)
  })

  const { port } = server.address()
  const response = await fetch(`http://127.0.0.1:${port}/api/health`)
  const body = await response.json()

  assert.equal(response.status, 200)
  assert.deepEqual(body, { status: 'ok' })

  await new Promise((resolve, reject) => {
    server.close((error) => {
      if (error) {
        reject(error)
        return
      }

      resolve()
    })
  })
})
