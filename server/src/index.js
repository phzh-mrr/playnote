import { createApp } from './app.js'
import { createNotesRepository } from './notes-repository.js'

const port = Number(process.env.PORT ?? 3000)
const notesRepository = createNotesRepository(process.env.DATABASE_PATH)
const app = createApp({ notesRepository })

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`)
})
