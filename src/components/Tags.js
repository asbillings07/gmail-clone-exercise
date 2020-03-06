import PropTypes from 'prop-types'
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  tag: {
    backgroundColor: '#6A6D72',
    fontSize: 12,
    padding: '0px 4px',
    color: 'white',
    marginRight: 10,
    borderRadius: 5
  }
})
export const Tags = ({ emails }) => {
  const classes = useStyles()
  return emails.tags.map((tag, i) => (
    <span className={classes.tag} key={i}>
      {tag}
    </span>
  ))
}

Tags.propTypes = {
  emails: PropTypes.object.isRequired
}
