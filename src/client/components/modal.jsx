import React from 'react'
import {createPortal} from 'react-dom'
import {FiX} from 'react-icons/fi'
import styled from 'styled-components'

import Card from 'components/card'
import Text from 'components/text'

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
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 40rem;
  max-width: 64rem;
  border-radius: 1rem;
  background: white;
  z-index: 2;
  box-shadow: 0 0 1rem black;
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
            <Text.SectionTitle>{title}</Text.SectionTitle>
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
