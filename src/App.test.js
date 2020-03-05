import React from 'react'
import { customRender } from './setupTests'
import App from './App'

test('renders learn react link', () => {
  const { getByText } = customRender(<App />)
  const linkElement = getByText(/learn react/i)
  expect(linkElement).toBeInTheDocument()
})
