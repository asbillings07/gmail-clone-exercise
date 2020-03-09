import React from 'react'
import { customRender } from '../setupTests'
import { SideBarList } from '../components/SideBarList'

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: jest.fn()
  })
}))

test('SideBarList Shows All Buttons', () => {
  const { getByTestId } = customRender(<SideBarList toolbar='' />)
  // ensure all buttons exist
  const inboxButton = getByTestId('inboxButton')
  expect(inboxButton).toBeTruthy()
  expect(getByTestId('workButton')).toBeTruthy()
  expect(getByTestId('travelButton')).toBeTruthy()
  expect(getByTestId('businessButton')).toBeTruthy()
})
