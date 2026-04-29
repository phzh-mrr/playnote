import { useEffect, useState } from 'react'

export const APP_TITLE = 'Playnote'
export const SAVE_BUTTON_LABEL = 'Save note'
export const NOTES_SECTION_TITLE = 'Saved notes'
export const DELETE_BUTTON_LABEL = 'Delete'

export default function App() {
  const [text, setText] = useState('')
  const [status, setStatus] = useState('idle')
  const [message, setMessage] = useState('')
  const [notes, setNotes] = useState([])
  const [notesStatus, setNotesStatus] = useState('loading')

  useEffect(() => {
    loadNotes()
  }, [])

  async function loadNotes() {
    setNotesStatus('loading')

    try {
      const response = await fetch('/api/notes')

      if (!response.ok) {
        throw new Error('Request failed')
      }

      const loadedNotes = await response.json()
      setNotes(loadedNotes)
      setNotesStatus('ready')
    } catch {
      setNotesStatus('error')
    }
  }

  async function handleDelete(noteId) {
    setMessage('')

    try {
      const response = await fetch(`/api/notes/${noteId}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        throw new Error('Request failed')
      }

      setStatus('success')
      setMessage('Note deleted.')
      await loadNotes()
    } catch {
      setStatus('error')
      setMessage('Delete failed.')
    }
  }

  async function handleSubmit(event) {
    event.preventDefault()

    const trimmedText = text.trim()

    if (!trimmedText) {
      setStatus('error')
      setMessage('Enter a note before saving.')
      return
    }

    setStatus('saving')
    setMessage('')

    try {
      const response = await fetch('/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: trimmedText })
      })

      if (!response.ok) {
        throw new Error('Request failed')
      }

      setText('')
      setStatus('success')
      setMessage('Note saved.')
      await loadNotes()
    } catch {
      setStatus('error')
      setMessage('Saving failed.')
    }
  }

  return (
    <main className="app-shell">
      <h1>{APP_TITLE}</h1>
      <p>A quiet place for your thoughts.</p>
      <form className="note-form" onSubmit={handleSubmit}>
        <label className="note-form__label" htmlFor="note-text">
          New note
        </label>
        <textarea
          id="note-text"
          className="note-form__input"
          value={text}
          onChange={(event) => setText(event.target.value)}
          rows="4"
          placeholder="What's on your mind?"
        />
        <button className="note-form__button" type="submit" disabled={status === 'saving'}>
          {status === 'saving' ? 'Saving...' : SAVE_BUTTON_LABEL}
        </button>
      </form>
      {message ? (
        <p className={`note-form__message note-form__message--${status === 'error' ? 'error' : 'success'}`}>
          {message}
        </p>
      ) : null}
      <section className="notes-section">
        <h2>{NOTES_SECTION_TITLE}</h2>
        {notesStatus === 'loading' ? <p>Loading notes...</p> : null}
        {notesStatus === 'error' ? <p>Loading notes failed.</p> : null}
        {notesStatus === 'ready' && notes.length === 0 ? <p>No notes saved yet.</p> : null}
        {notes.length > 0 ? (
          <ul className="notes-list">
            {notes.map((note) => (
              <li key={note.id} className="notes-list__item">
                <div className="notes-list__content">
                  <p className="notes-list__text">{note.text}</p>
                  <p className="notes-list__meta">{new Date(note.created_at).toLocaleString()}</p>
                </div>
                <button className="notes-list__delete" type="button" onClick={() => handleDelete(note.id)}>
                  {DELETE_BUTTON_LABEL}
                </button>
              </li>
            ))}
          </ul>
        ) : null}
      </section>
    </main>
  )
}
