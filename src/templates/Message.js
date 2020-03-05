import React from 'react'
import { Card, Button } from 'react-bootstrap'
import styled from 'styled-components'
import { useStore } from '../Store'
export const Message = ({ match }) => {
  const { id } = match.params
  const store = useStore()
  const email = store.emails.map(email => email)[id]
  return (
    <Container>
      <Button href='/'>Emails</Button>
      <MessageCard key={email.id}>
        <Card.Title>Subject: {email.subject}</Card.Title>
        <Card.Subtitle>from: {email.sender}</Card.Subtitle>
        <Card.Body>{email.body}</Card.Body>
      </MessageCard>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`
const MessageCard = styled(Card)`
  justify-content: center;
`
