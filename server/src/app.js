import express from 'express'

export function createApp({ notesRepository }) {
  const app = express()

  app.use(express.json())

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

  return app
}
