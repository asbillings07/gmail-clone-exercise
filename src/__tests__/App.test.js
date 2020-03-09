import React from 'react'
import { customRender } from '../setupTests'
import App from '../App'

test('displays App Title in header', () => {
  const { getByTestId } = customRender(<App />)
  expect(getByTestId('Header').textContent).toBe('Me-Mail')
})
