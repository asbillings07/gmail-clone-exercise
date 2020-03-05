import React, { useState } from 'react'
import { Nav, Navbar } from 'react-bootstrap'
import styled from 'styled-components'
import { Email } from '@styled-icons/evaicons-solid/Email'
export const TopBar = () => {
  return (
    <Navbar>
      <Navbar.Brand href='#home'>Navbar</Navbar.Brand>
      <StyledNav>
        <EmailIcon />
        <Nav.Link href='#home'>Home</Nav.Link>
      </StyledNav>
    </Navbar>
  )
}
const EmailIcon = styled(Email)`
  color: red;
`
const StyledNav = styled(Nav)`
  marginright: auto;
`
