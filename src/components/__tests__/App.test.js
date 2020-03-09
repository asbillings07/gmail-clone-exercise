import React from 'react'
import { customRender } from '../../setupTests'
import App from '../../App'

test('renders learn react link', () => {
  const { queryAllByTestId } = customRender(<App />)
  expect(queryAllByTestId('emailSender')).toBeTruthy()
  expect(queryAllByTestId('emailSubject')).toBeTruthy()
  expect(queryAllByTestId('bodySnippet')).toBeTruthy()
})
