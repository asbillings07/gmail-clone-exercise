import React, { createContext, useContext } from 'react'
import emails from './emails.json'
const Store = createContext()

function Provider({ children }) {
  const value = {
    emails: emails.messages
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
