import React from 'react'
import styled from "styled-components";

export const Body = () => {
  return (
    <BodyStyled>
    <article className='body-container'>
      <section className=''>HOW TO USE?</section>
      <section></section>
    </article>
    </BodyStyled>
  )
}

const BodyStyled = styled.div`
  .body-container{
    width: 100vw;
    height: 100vh;
    background-color : #0049EE;
  }
`