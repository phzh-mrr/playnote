import test from 'node:test'
import assert from 'node:assert/strict'
import os from 'node:os'
import path from 'node:path'
import { mkdtemp, rm } from 'node:fs/promises'
import { createApp } from '../src/app.js'
import { createNotesRepository } from '../src/notes-repository.js'

async function withServer(run) {
  const tempDirectory = await mkdtemp(path.join(os.tmpdir(), 'playnote-'))
  const databasePath = path.join(tempDirectory, 'test.sqlite')
  const notesRepository = createNotesRepository(databasePath)
  const app = createApp({ notesRepository })
  const server = app.listen(0)

  await new Promise((resolve, reject) => {
    server.once('listening', resolve)
    server.once('error', reject)
  })

  try {
    await run(server)
  } finally {
    await new Promise((resolve, reject) => {
      server.close((error) => {
        if (error) {
          reject(error)
          return
        }

        resolve()
      })
    })

    notesRepository.close()
    await rm(tempDirectory, { recursive: true, force: true })
  }
}

test('GET /api/health returns ok', async () => {
  await withServer(async (server) => {
    const { port } = server.address()
    const response = await fetch(`http://127.0.0.1:${port}/api/health`)
    const body = await response.json()

    assert.equal(response.status, 200)
    assert.deepEqual(body, { status: 'ok' })
  })
})

test('POST /api/notes stores a note and GET /api/notes returns it', async () => {
  await withServer(async (server) => {
    const { port } = server.address()
    const createResponse = await fetch(`http://127.0.0.1:${port}/api/notes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text: 'First note' })
    })

    const createdNote = await createResponse.json()

    assert.equal(createResponse.status, 201)
    assert.equal(createdNote.text, 'First note')
    assert.equal(createdNote.id, 1)
    assert.ok(createdNote.created_at)

    const listResponse = await fetch(`http://127.0.0.1:${port}/api/notes`)
    const notes = await listResponse.json()

    assert.equal(listResponse.status, 200)
    assert.equal(notes.length, 1)
    assert.equal(notes[0].text, 'First note')
    assert.equal(notes[0].id, 1)
  })
})

test('POST /api/notes rejects empty text', async () => {
  await withServer(async (server) => {
    const { port } = server.address()
    const response = await fetch(`http://127.0.0.1:${port}/api/notes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text: '   ' })
    })

    const body = await response.json()

    assert.equal(response.status, 400)
    assert.deepEqual(body, { error: 'Text is required.' })
  })
})
