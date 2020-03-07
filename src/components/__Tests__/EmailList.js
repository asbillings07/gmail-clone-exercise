import React from 'react'
import { customRender } from './setupTests'
import { EmailList } from '../../templates/EmailList'

test('renders learn react link', () => {
  const { queryAllByTestId, debug } = customRender(<EmailList />)
  expect(queryAllByTestId('emailSender')).tobe(10)
  expect(queryAllByTestId('emailSubject')).tobe(10)
  expect(queryAllByTestId('bodySnippet')).tobe(10)
  debug()
})
