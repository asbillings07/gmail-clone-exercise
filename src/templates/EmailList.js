import React, { useState, useRef } from 'react'
import HTMLParser from 'html-react-parser'
import { useHistory } from 'react-router-dom'
import { useStore } from '../Store'
import { makeStyles } from '@material-ui/core/styles'
import { useWindowDimensions } from '../components/Hooks/useWindowDimensions'
import { Delete, Label } from '@material-ui/icons'
import { Tags } from '../components/Tags'
import { PopOver } from '../components/reuseable-ui/PopOver'
import { Button, Checkbox, CardContent, List, ListItem, ListItemText, Divider, Grid, Table, TableBody, TableCell, TableRow, Container, Paper, Typography } from '@material-ui/core'
const useStyles = makeStyles(theme => ({
  root: { padding: theme.spacing(8) },
  checkbox: { margin: theme.spacing(1) },
  tags: { margin: 5 },
  subject: { fontWeight: 'bold' },
  tableRow: { width: '100%' },
  container: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - 240px)`,
      marginRight: 0,
      marginTop: 40
    },
    maxWidth: 1800
  },
  list: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      maxWidth: 360,
      flexDirection: 'column'
    },
    width: '100%'
  },
  tableItem: {
    display: 'flex'
  },
  tableQuery: {
    [theme.breakpoints.down('sm')]: {}
  },
  tableContent: { width: '100%', maxWidth: 1800, marginTop: 25 }
}))

export const EmailList = () => {
  const { emails, setEmail } = useStore()
  const { width } = useWindowDimensions()
  const anchorRef = useRef(null)
  const classes = useStyles()
  const history = useHistory()

  const [checked, setChecked] = useState([])
  const [isOpen, setIsOpen] = useState(false)

  const deleteEmails = () => {
    if (checked.length > 0) {
      const newEmails = emails.filter(email => !checked.includes(email))
      setEmail(newEmails)
      setChecked([])
    }
  }

  const addNewTag = tag => {
    if (checked.length > 0) {
      checked.forEach(email => {
        if (email.tags.indexOf(tag) === -1) {
          const index = emails.indexOf(email)
          emails[index].tags.push(tag)

          setIsOpen(false)
          setEmail(emails)
          setChecked([])
        }
      })
    }
  }

  const handleCheckedEmails = value => {
    const currentIndex = checked.indexOf(value)
    const newChecked = [...checked]

    if (currentIndex === -1) {
      newChecked.push(value)
    } else {
      newChecked.splice(currentIndex, 1)
    }

    setChecked(newChecked)
  }

  const formatDate = date => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    const oldDate = new Date(date)
    const dateformatter = new Intl.DateTimeFormat('en-US', options)
    return dateformatter.format(oldDate)
  }
  const getBodySnippet = body => {
    let emailBody
    width > 400 ? (emailBody = `${body.substring(0, 80)}...`) : (emailBody = `${body.substring(0, 20)}...`)

    return HTMLParser(emailBody)
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
                  {}
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
                            <List className={classes.list}>
                              <ListItem role={undefined} dense button onClick={() => history.push(`/message/${email.id}`)}>
                                <ListItemText data-testid='emailSender' primary={email.sender.substring(0, 9).replace('.', ' ')} secondary={formatDate(email.date)} />
                                <Tags emails={email} />
                              </ListItem>
                              <ListItem>
                                <ListItemText
                                  disableTypography
                                  data-testid='emailSubject'
                                  primary={
                                    <Typography className={classes.subject} variant='h6'>
                                      {email.subject}
                                    </Typography>
                                  }
                                  secondary={<span data-testid='bodySnippet'>{getBodySnippet(email.body)}</span>}
                                />
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
