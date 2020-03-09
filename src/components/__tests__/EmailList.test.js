import React from 'react'
import { customRender, cleanup, waitForElement } from '../../setupTests'
import { EmailList } from '../../templates/EmailList'
import userEvent from '@testing-library/user-event'

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: jest.fn()
  })
}))

beforeEach(() => {
  cleanup()
})

test('Email List Shows 10 emails with their content along with 9 tags', () => {
  const { queryAllByTestId } = customRender(<EmailList />)
  expect(queryAllByTestId('emailSender')).toHaveLength(10)
  expect(queryAllByTestId('emailSubject')).toHaveLength(10)
  expect(queryAllByTestId('bodySnippet')).toHaveLength(10)
  expect(queryAllByTestId('checkBox')).toHaveLength(10)
  expect(queryAllByTestId('tags')).toHaveLength(9)
})

test('clicking on checkBox selects email', () => {
  const { queryAllByTestId } = customRender(<EmailList />)
  const checkBox = queryAllByTestId('checkBox')
  userEvent.click(checkBox[0])
  expect(checkBox[0].querySelector('input[type="checkbox"]')).toHaveProperty('checked', true)
})

test('Adding Tags to emails works correctly', () => {
  const { queryAllByTestId, getByTestId } = customRender(<EmailList />)
  const checkBox = queryAllByTestId('checkBox')
  const tagBtn = getByTestId('tagButton')
  // click on first email check box then click on tags button
  userEvent.click(checkBox[0])
  userEvent.click(tagBtn)
  // Dialog box should open
  expect(getByTestId('dialogBox')).toBeTruthy()
  expect(getByTestId('workItem')).toBeTruthy()
  const travelItem = getByTestId('travelItem')
  expect(travelItem).toBeTruthy()
  expect(getByTestId('businessItem')).toBeTruthy()
  // click on travel button
  userEvent.click(travelItem)
  // tags should have another item added to it.
  const tags = queryAllByTestId('tags')
  // tags.length was 9 now it is 10
  expect(tags).toHaveLength(10)
})

test('Deleting emails removes them correctly', async () => {
  const { queryAllByTestId, getByTestId, debug } = customRender(<EmailList />)
  const delBtn = getByTestId('deleteButton')
  const checkBox = queryAllByTestId('checkBox')
  // click on first email check box then click on delete button
  userEvent.click(checkBox[0])
  userEvent.click(delBtn)
  const restEmails = await waitForElement(() => queryAllByTestId('emailCell'))
  // emails.length was 10 but now should be 9
  expect(restEmails).toHaveLength(9)
})
