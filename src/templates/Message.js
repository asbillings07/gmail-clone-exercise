import React from 'react'
import { Card, Button, CardHeader, CardContent, Container } from '@material-ui/core'
import { useStore } from '../Store'
import { makeStyles } from '@material-ui/core/styles'
import { ArrowBack } from '@material-ui/icons'
const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 40,
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - 240px)`,
      marginRight: 0,
      marginTop: 60
    }
  }
}))

export const Message = ({ match }) => {
  const classes = useStyles()
  const { id } = match.params
  const store = useStore()
  const email = store.emails.map(email => email)[id]
  return (
    <Container className={classes.container}>
      <Card key={email.id}>
        <Button href='/'>
          <ArrowBack />
        </Button>
        <CardHeader subheader={email.sender} title={email.subject} />
        <CardContent
          dangerouslySetInnerHTML={{
            __html: email.body
          }}
        ></CardContent>
      </Card>
    </Container>
  )
}
