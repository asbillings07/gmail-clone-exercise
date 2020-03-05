import React from 'react'
import { TopBar } from '../components/TopBar'
import styled from 'styled-components'
export const Header = () => {
  return (
    <Container>
      <TopBar />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justifycontent: center;
`
