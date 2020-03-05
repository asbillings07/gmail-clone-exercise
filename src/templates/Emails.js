import React from 'react'
import { EmailBar } from '../components/EmailBar'
import { useStore } from '../Store'
export const Emails = () => {
  const store = useStore()
  return <EmailBar emails={store.emails} />
}
