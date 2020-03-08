import React, { useState, useRef } from 'react'
import HTMLParser from 'html-react-parser'
import { useHistory } from 'react-router-dom'
import { useStore } from '../Store'
import { CustomDialog } from '../components/reuseable-ui/Dialog'
import { makeStyles } from '@material-ui/core/styles'
import { useWindowDimensions } from '../components/Hooks/useWindowDimensions'
import { Delete, Label } from '@material-ui/icons'
import { Tags } from '../components/Tags'
import {
  Button,
  Checkbox,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Container,
  Paper,
  Typography,
  MenuItem,
  ClickAwayListener,
  MenuList
} from '@material-ui/core'
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
  const { emails, setEmail, setToast } = useStore()
  const { width } = useWindowDimensions()
  const anchorRef = useRef(null)
  const classes = useStyles()
  const history = useHistory()

  const [checked, setChecked] = useState([])
  const [isOpen, setIsOpen] = useState(false)

  const handleDialogClose = () => {
    setIsOpen(false)
  }

  const deleteEmails = () => {
    if (checked.length > 0) {
      const newEmails = emails.filter(email => !checked.includes(email))
      setEmail(newEmails)
      setToast({
        isOpen: true,
        message: `${checked.length} email(s) have been deleted`,
        variant: 'success'
      })
      setChecked([])
    } else {
      setToast({
        isOpen: true,
        message: 'No emails selected to delete',
        variant: 'info'
      })
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
    } else {
      setToast({
        isOpen: true,
        message: 'No emails selected to add tags to',
        variant: 'info'
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
          <Grid container justify='flex-end' alignItems='center' style={{ marginBottom: '10px', marginTop: '10px' }}>
            <Grid item style={{ marginTop: '15px' }}>
              <Button data-testid='deleteButton' onClick={() => deleteEmails()}>
                <Delete />
              </Button>
            </Grid>
            <Grid item style={{ marginTop: '15px' }}>
              <Button data-testid='tagButton' onClick={() => setIsOpen(true)} ref={anchorRef}>
                <Label />
              </Button>
              <CustomDialog isOpen={isOpen} handleClose={handleDialogClose} title='Add New Tag'>
                <Paper data-testid='dialogBox'>
                  <ClickAwayListener onClickAway={handleDialogClose}>
                    <MenuList autoFocusItem={isOpen} id='menu-list-grow'>
                      <MenuItem value='work' data-testid='workItem' onClick={e => addNewTag(e.target.textContent)}>
                        work
                      </MenuItem>
                      <MenuItem value='Travel' data-testid='travelItem' onClick={e => addNewTag(e.target.textContent)}>
                        travel
                      </MenuItem>
                      <MenuItem value='business' data-testid='businessItem' onClick={e => addNewTag(e.target.textContent)}>
                        business
                      </MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </CustomDialog>
            </Grid>
            <CardContent className={classes.tableContent}>
              <Divider orientation='horizontal' />
              <Grid>
                <Table size='medium'>
                  <TableBody>
                    {}
                    {emails
                      ? emails.map(email => (
                          <TableRow
                            className={classes.tableRow}
                            hover
                            key={email.id}
                            style={{
                              verticalAlign: 'top'
                            }}
                          >
                            <TableCell data-testid='checkBoxFunction' onClick={() => handleCheckedEmails(email)}>
                              <Checkbox data-testid='checkBox' edge='start' checked={checked.indexOf(email) !== -1} tabIndex={-1} disableRipple />
                            </TableCell>
                            <TableCell data-testid='emailCell' onClick={() => history.push(`/message/${email.id}`)}>
                              <List className={classes.list}>
                                <ListItem role={undefined} dense button>
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
          </Grid>
        </form>
      </Paper>
    </Container>
  )
}
