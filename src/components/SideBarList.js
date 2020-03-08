import PropTypes from 'prop-types'
import React from 'react'
import { useHistory } from 'react-router-dom'
import { List, ListItem, Divider, ListItemIcon, ListItemText } from '@material-ui/core'
import { Mail, Send, Work, FlightTakeoff, Business } from '@material-ui/icons'

export const SideBarList = ({ toolbar }) => {
  const history = useHistory()

  return (
    <div>
      <div className={toolbar} />
      <Divider />
      <List>
        <ListItem button onClick={() => history.push('/')}>
          <ListItemIcon>{<Mail />}</ListItemIcon>
          <ListItemText primary='Inbox' />
        </ListItem>
        <ListItem button>
          <ListItemIcon>{<Send />}</ListItemIcon>
          <ListItemText primary='Send email' />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button>
          <ListItemIcon>{<FlightTakeoff />}</ListItemIcon>
          <ListItemText primary='travel' />
        </ListItem>
        <ListItem button>
          <ListItemIcon>{<Work />}</ListItemIcon>
          <ListItemText primary='work' />
        </ListItem>
        <ListItem button>
          <ListItemIcon>{<Business />}</ListItemIcon>
          <ListItemText primary='business' />
        </ListItem>
      </List>
    </div>
  )
}

SideBarList.propTypes = {
  toolbar: PropTypes.string.isRequired
}
