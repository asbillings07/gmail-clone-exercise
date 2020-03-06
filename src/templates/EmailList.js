import React from 'react'
import { EmailBar } from '../components/EmailBar'
import { useStore } from '../Store'
import { EmailTable } from './EmailTable'
export const EmailList = () => {
  const store = useStore()
  return <EmailBar emails={store.email} setEmail={store.setEmail} />
}
