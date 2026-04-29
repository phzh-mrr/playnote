import { describe, expect, it } from 'vitest'
import {
  APP_TITLE,
  DARK_MODE_LABEL,
  DELETE_BUTTON_LABEL,
  LIGHT_MODE_LABEL,
  NOTES_SECTION_TITLE,
  SAVE_BUTTON_LABEL
} from './App'

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

  it('renders a dark mode toggle label', () => {
    expect(DARK_MODE_LABEL).toBe('Dark mode')
  })

  it('renders a light mode toggle label', () => {
    expect(LIGHT_MODE_LABEL).toBe('Light mode')
  })
})
