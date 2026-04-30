import express from 'express'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { existsSync } from 'node:fs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const distPath = join(__dirname, '../../client/dist')

export function createApp({ notesRepository }) {
  const app = express()

  app.use(express.json())

  if (existsSync(distPath)) {
    app.use(express.static(distPath))
  }

  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok' })
  })

  app.get('/api/notes', (_req, res) => {
    res.json(notesRepository.listNotes())
  })

  app.post('/api/notes', (req, res) => {
    const text = req.body?.text?.trim()

    if (!text) {
      res.status(400).json({ error: 'Text is required.' })
      return
    }

    const note = notesRepository.createNote(text)
    res.status(201).json(note)
  })

  app.delete('/api/notes/:id', (req, res) => {
    const id = Number(req.params.id)

    if (!Number.isInteger(id) || id <= 0) {
      res.status(400).json({ error: 'A valid note id is required.' })
      return
    }

    const deleted = notesRepository.deleteNote(id)

    if (!deleted) {
      res.status(404).json({ error: 'Note not found.' })
      return
    }

    res.status(204).end()
  })

  if (existsSync(distPath)) {
    app.get('*', (_req, res) => {
      res.sendFile(join(distPath, 'index.html'))
    })
  }

  return app
}
