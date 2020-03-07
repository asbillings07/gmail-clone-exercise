import React, { createContext, useContext, useState } from 'react'
import emailJson from './emails.json'
const Store = createContext()

function Provider({ children }) {
  const emails = emailJson.messages
  const [email, setEmail] = useState(emails)
  const value = {
    emails: email,
    setEmail
  }
  return <Store.Provider value={value}>{children}</Store.Provider>
}

/* allows use of State without needing to repeat useContext hook,
 also allows for easier testing */
function useStore() {
  const store = useContext(Store)
  if (!store) throw new Error('Cannot `getStore` outside a context provider')
  return store
}

export { Store, Provider, useStore }
