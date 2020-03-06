import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { Delete } from '@material-ui/icons'
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
  }
}))

export const EmailBar = ({ emails, setEmail }) => {
  const classes = useStyles()
  const history = useHistory()

  const [checked, setChecked] = useState([])

  const deleteEmail = () => {
    const newEmails = emails.filter(email => !checked.includes(email))
    setEmail(newEmails)
  }

  const handleChecked = value => {
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
      <Paper position='static'>
        <form autoComplete='off' noValidate>
          <Divider />
          <CardContent>
            <Grid container justify='flex-end' style={{ marginBottom: '10pt' }}>
              <Grid item>
                <Button onClick={() => deleteEmail()}>
                  <Delete />
                </Button>
              </Grid>
              <Table size='medium'>
                <TableBody>
                  {emails.map(email => (
                    <TableRow
                      className={classes.tableRow}
                      hover
                      onClick={() => handleChecked(email)}
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
                            <ListItemText primary={email.subject} />
                            {email.tags.map((tag, i) => (
                              <Typography className={classes.tags} key={i} variant='subtitle1'>
                                {tag}
                              </Typography>
                            ))}
                          </ListItem>
                        </List>
                      </TableCell>
                    </TableRow>
                  ))}
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
