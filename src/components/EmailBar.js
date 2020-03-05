import React from 'react'
import { Card, Button } from 'react-bootstrap'
import styled from 'styled-components'

export const EmailBar = ({ emails }) => {
  return emails.map(email => (
    <MessageCard key={email.id}>
      <ShowMessageButton href={`/message/${email.id}`}>
        <Card.Body>{email.subject}</Card.Body>
      </ShowMessageButton>
    </MessageCard>
  ))
}

const ShowMessageButton = styled(Button)`
  background-color: white;
  color: black;
  border-color: lightgray;
`
const MessageCard = styled(Card)`
  border: none;
`
