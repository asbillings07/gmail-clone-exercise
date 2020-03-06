import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper
  }
}))

export function Lists({ subject, id, content }) {
  const classes = useStyles()
  const history = useHistory()
  

Lists.propTypes = {
  content: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  subject: PropTypes.string.isRequired
}
