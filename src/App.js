import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { SideBar } from './templates/SideBar'
import { useStore } from './Store'
import { EmailList } from './templates/EmailList'
import { Message } from './templates/Message'
import { Toast } from './components/reuseable-ui/GlobalToast'
function App() {
  const { toast, setToast } = useStore()
  const closeToast = () => {
    setToast({
      isOpen: false,
      message: '',
      variant: 'info'
    })
  }
  return (
    <Router>
      <Toast isOpen={toast.isOpen} variant={toast.variant} message={toast.message} onClose={closeToast} />
      <SideBar />
      {/* Need SideBar Here */}
      <Switch>
        <Route exact path='/' component={EmailList} />
        <Route exact path='/message/:id' component={Message} />
      </Switch>
    </Router>
  )
}

export default App
