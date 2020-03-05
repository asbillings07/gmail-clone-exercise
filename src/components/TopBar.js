import React from 'react'
import { Nav, Navbar } from 'react-bootstrap'
import styled from 'styled-components'
import menu from '../images/menu.png'
import email from '../images/email.png'
import { SideBar } from '@styled-icons/remix-line'
export const TopBar = () => {
  return (
    <Navbar>
      <button>
        <img src={menu} alt='menu' />
      </button>
      <Navbar.Brand href='#home'>Gmail Clone</Navbar.Brand>
      <StyledNav>
        <SideBar />
        <img src={email} alt='email' />
      </StyledNav>
    </Navbar>
  )
}

const StyledNav = styled(Nav)`
  marginright: auto;
`
