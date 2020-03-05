import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from '../store'

function customRender(ui, options) {
  function Wrapper(props) {
    return <Provider {...props} />
  }
  return render(ui, { wrapper: Wrapper, ...options })
}

export * from '@testing-library/react'
export { customRender }
