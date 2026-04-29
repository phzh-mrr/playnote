import { describe, expect, it } from 'vitest'
import { APP_TITLE, DELETE_BUTTON_LABEL, NOTES_SECTION_TITLE, SAVE_BUTTON_LABEL } from './App'

describe('App', () => {
  it('renders the app title', () => {
    expect(APP_TITLE).toBe('Playnote')
  })

  it('renders a save note button', () => {
    expect(SAVE_BUTTON_LABEL).toBe('Save note')
  })

  it('renders the notes section title', () => {
    expect(NOTES_SECTION_TITLE).toBe('Saved notes')
  })

  it('renders a delete note button label', () => {
    expect(DELETE_BUTTON_LABEL).toBe('Delete')
  })
})
