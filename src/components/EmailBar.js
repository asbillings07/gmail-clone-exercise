import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { Delete, Label } from '@material-ui/icons'
import { Tags } from '../components/Tags'
import { PopOver } from '../components/reuseable-ui/PopOver'
import { Button, Checkbox, CardContent, List, ListItem, ListItemText, Divider, Grid, Table, TableBody, TableCell, TableHead, TableRow, Container, Paper, Typography } from '@material-ui/core'
const useStyles = makeStyles(theme => ({
  formControl: { margin: theme.spacing(1), minWidth: 120 },
  selectEmpty: { marginTop: theme.spacing(3) },
  spacer: { margin: theme.spacing(1) },
  root: { padding: theme.spacing(8) },
  list: { padding: 10 },
  checkbox: { margin: theme.spacing(1) },
  extendedIcon: { marginRight: theme.spacing(1) },
  tags: { margin: 5 },
  subject: { fontWeight: 'bold' },
  tableRow: { width: '100%' },
  container: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - 240px)`,
      marginRight: 0,
      marginTop: 40
    }
  },
  tableItem: {
    display: 'flex'
  },
  tableQuery: {
    [theme.breakpoints.up('sm')]: {}
  },
  tableContent: { width: '100%', maxWidth: 1800, marginTop: 25 }
}))

export const EmailBar = ({ emails, setEmail }) => {
  const anchorRef = useRef(null)
  const classes = useStyles()
  const history = useHistory()

  const [checked, setChecked] = useState([])
  const [isOpen, setIsOpen] = useState(false)

  const deleteEmails = () => {
    if (checked.length > 0) {
      const newEmails = emails.filter(email => !checked.includes(email))
      setEmail(newEmails)
    }
  }

  const addNewTag = tag => {
    if (checked.length > 0) {
      checked.forEach(email => {
        if (email.tags.indexOf(tag) === -1) {
          console.log('does not have tag', email.id)
          const index = email.id === 0 ? email.id : email.id - 1

          emails[index].tags.push(tag)

          setIsOpen(false)
          setEmail(emails)
          setChecked([])
        }
      })
    }
  }

  const removeTags = emails => {}

  const handleCheckedEmails = value => {
    console.log('checked Before', checked)
    const currentIndex = checked.indexOf(value)
    console.log('currentIndex', currentIndex)
    const newChecked = [...checked]
    console.log('newChecked', newChecked)
    if (currentIndex === -1) {
      newChecked.push(value)
    } else {
      newChecked.splice(currentIndex, 1)
    }
    console.log('newChecked', newChecked)

    setChecked(newChecked)
    console.log('Checked', checked)
  }

  const formatDate = date => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    const oldDate = new Date(date)
    const dateformatter = new Intl.DateTimeFormat('en-US', options)
    return dateformatter.format(oldDate)
  }

  return (
    <Container className={classes.container}>
      <Paper position='static' className={classes.tableContent}>
        <form autoComplete='off' noValidate>
          <Divider />
          <CardContent className={classes.tableContent}>
            <Grid container justify='flex-end' style={{ marginBottom: '10pt' }}>
              <Grid item>
                <Button onClick={() => deleteEmails()}>
                  <Delete />
                </Button>
              </Grid>
              <Grid item>
                <Button onClick={() => setIsOpen(true)} ref={anchorRef}>
                  <Label />
                </Button>
                <PopOver isOpen={isOpen} setIsOpen={setIsOpen} addTags={addNewTag} anchorRef={anchorRef} />
              </Grid>
              <Table size='medium'>
                <TableBody>
                  {console.log(emails)}
                  {emails
                    ? emails.map(email => (
                        <TableRow
                          className={classes.tableRow}
                          hover
                          onClick={() => handleCheckedEmails(email)}
                          key={email.id}
                          style={{
                            verticalAlign: 'top'
                          }}
                        >
                          <TableCell>
                            <Checkbox edge='start' checked={checked.indexOf(email) !== -1} tabIndex={-1} disableRipple />
                          </TableCell>
                          <TableCell>
                            <List>
                              <ListItem role={undefined} dense button onClick={() => history.push(`/message/${email.id}`)}>
                                <ListItemText primary={email.sender.substring(0, 9).replace('.', ' ')} secondary={formatDate(email.date)} />
                                <Tags emails={email} />
                                <ListItemText>
                                  <Typography className={classes.subject} variant='body1'>
                                    {email.subject}
                                  </Typography>
                                </ListItemText>
                              </ListItem>
                            </List>
                          </TableCell>
                        </TableRow>
                      ))
                    : ''}
                </TableBody>
              </Table>
            </Grid>
          </CardContent>
        </form>
      </Paper>
    </Container>
  )
}

EmailBar.propTypes = {
  emails: PropTypes.array.isRequired
}
