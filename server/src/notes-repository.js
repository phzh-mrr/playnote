import { DatabaseSync } from 'node:sqlite'

export function createNotesRepository(databasePath = 'playnote.db') {
  const database = new DatabaseSync(databasePath)

  database.exec(`
    CREATE TABLE IF NOT EXISTS notes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      text TEXT NOT NULL,
      created_at TEXT NOT NULL
    )
  `)

  const listNotesStatement = database.prepare(`
    SELECT id, text, created_at
    FROM notes
    ORDER BY datetime(created_at) DESC, id DESC
  `)

  const insertNoteStatement = database.prepare(`
    INSERT INTO notes (text, created_at)
    VALUES (?, ?)
  `)

  const getNoteByIdStatement = database.prepare(`
    SELECT id, text, created_at
    FROM notes
    WHERE id = ?
  `)

  return {
    createNote(text) {
      const createdAt = new Date().toISOString()
      const result = insertNoteStatement.run(text, createdAt)

      return getNoteByIdStatement.get(Number(result.lastInsertRowid))
    },
    listNotes() {
      return listNotesStatement.all()
    },
    close() {
      database.close()
    }
  }
}
