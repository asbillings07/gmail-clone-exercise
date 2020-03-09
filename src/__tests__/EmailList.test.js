import React from 'react'
import { customRender, cleanup, waitForElement } from '../setupTests'
import { EmailList } from '../templates/EmailList'
import userEvent from '@testing-library/user-event'

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: jest.fn()
  })
}))

afterEach(() => {
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

test('Adding Tags adds them to the email', () => {
  const { queryAllByTestId, getByTestId } = customRender(<EmailList />)
  const checkBox = queryAllByTestId('checkBox')
  const addTag = getByTestId('addTagButton')
  // click on first email check box then click on tags button
  userEvent.click(checkBox[0])
  userEvent.click(addTag)
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

test('Adding Tags adds them to mulitple emails', () => {
  const { queryAllByTestId, getByTestId } = customRender(<EmailList />)
  const checkBox = queryAllByTestId('checkBox')
  const addTag = getByTestId('addTagButton')
  // click on first email check box then click on tags button
  userEvent.click(checkBox[0])
  userEvent.click(checkBox[1])
  userEvent.click(checkBox[2])
  userEvent.click(checkBox[3])

  userEvent.click(addTag)
  // Dialog box should open
  expect(getByTestId('dialogBox')).toBeTruthy()
  expect(getByTestId('workItem')).toBeTruthy()
  const businessItem = getByTestId('businessItem')
  expect(getByTestId('travelItem')).toBeTruthy()
  expect(businessItem).toBeTruthy()
  // click on travel button
  userEvent.click(businessItem)
  // tags should have another item added to it.
  const tags = queryAllByTestId('tags')
  // tags.length was 9 now it is 10
  expect(tags).toHaveLength(14)
})

test('removing tags removes them from one email selected', () => {
  const { queryAllByTestId, getByTestId } = customRender(<EmailList />)
  const checkBox = queryAllByTestId('checkBox')
  const removeTag = getByTestId('removeTagButton')
  // click on first email check box then click on tags button
  userEvent.click(checkBox[0])
  userEvent.click(removeTag)
  // Dialog box should open
  expect(getByTestId('dialogBox')).toBeTruthy()
  const workItem = getByTestId('workItem')

  expect(workItem).toBeTruthy()
  expect(getByTestId('travelItem')).toBeTruthy()
  expect(getByTestId('businessItem')).toBeTruthy()
  // click on travel button
  userEvent.click(workItem)
  // tags should have another item added to it.
  const tags = queryAllByTestId('tags')
  // tags.length was 14 since we added more now it is 13
  expect(tags).toHaveLength(13)
})

test('removing tags removes them from multiple emails selected', () => {
  const { queryAllByTestId, getByTestId } = customRender(<EmailList />)
  const checkBox = queryAllByTestId('checkBox')
  const removeTag = getByTestId('removeTagButton')
  // click on first email check box then click on tags button
  userEvent.click(checkBox[0])
  userEvent.click(checkBox[4])
  userEvent.click(checkBox[6])
  userEvent.click(checkBox[7])
  userEvent.click(removeTag)
  // Dialog box should open
  expect(getByTestId('dialogBox')).toBeTruthy()
  const workItem = getByTestId('workItem')

  expect(workItem).toBeTruthy()
  expect(getByTestId('travelItem')).toBeTruthy()
  expect(getByTestId('businessItem')).toBeTruthy()
  // click on travel button
  userEvent.click(workItem)
  // tags should have another item added to it.
  const tags = queryAllByTestId('tags')
  // tags.length was 13 since we removed one now it is 10 since we removed more
  expect(tags).toHaveLength(10)
})

test('should be able to delete one email', async () => {
  const { queryAllByTestId, getByTestId } = customRender(<EmailList />)
  const delBtn = getByTestId('deleteButton')
  const checkBox = queryAllByTestId('checkBox')
  // click on first email check box then click on delete button
  userEvent.click(checkBox[0])
  userEvent.click(delBtn)
  const restEmails = await waitForElement(() => queryAllByTestId('emailCell'))
  // emails.length was 10 but now should be 9
  expect(restEmails).toHaveLength(9)
})

test('should be able to delete multiple emails', async () => {
  const { queryAllByTestId, getByTestId } = customRender(<EmailList />)
  const delBtn = getByTestId('deleteButton')
  const checkBox = queryAllByTestId('checkBox')
  // click on first email check box then click on delete button
  userEvent.click(checkBox[0])
  userEvent.click(checkBox[1])
  userEvent.click(checkBox[2])
  userEvent.click(checkBox[3])
  userEvent.click(delBtn)
  const restEmails = await waitForElement(() => queryAllByTestId('emailCell'))
  // emails.length was 10 since we deleted one but now should be 6
  expect(restEmails).toHaveLength(6)
})
