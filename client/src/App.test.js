import { describe, expect, it } from 'vitest'
import App from './App'

describe('App', () => {
  it('renders the app title', () => {
    expect(App().props.children[0].props.children).toBe('Playnote')
  })
})
