import React from 'react'
import {createPortal} from 'react-dom'
import {FiX} from 'react-icons/fi'
import styled from 'styled-components'

import Card from 'components/card'

const Overlay = styled.div`
  background: rgba(0, 0, 0, .5);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
`

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 64rem;
  margin: 2rem;
  border-radius: 1rem;
  background: white;
  z-index: 2;
`

const Modal = ({
  title,
  component,
  onCloseClick,
  onOutsideClick
}) => {
  return createPortal(
    <React.Fragment>
      <Overlay onClick={onOutsideClick} />
      <Container>
        <Card>
          <Card.Header>
            <h3>{title}</h3>
            <Card.HeaderAction onClick={onCloseClick}>
              <FiX />
            </Card.HeaderAction>
          </Card.Header>
          <Card.Content>
            {component}
          </Card.Content>
        </Card>
      </Container>
    </React.Fragment>,
    document.body
  )
}

export default Modal
