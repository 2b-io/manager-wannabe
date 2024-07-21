import React, {
  useState
} from 'react'
import {createPortal} from 'react-dom'
import {FiX} from 'react-icons/fi'
import styled from 'styled-components'

import Button from 'components/button'
import Card from 'components/card'
import Form from 'components/form'

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

const TimeLog = ({
  projects,
  initialProjectId,
  onCloseClick,
  onSubmit,
  onOutsideClick
}) => {
  const sortedProjects = Object.values(projects)
  const [selectedProjectId, setSelectedProjectId] = useState(initialProjectId)
  const [workType, setWorkType] = useState('sales')
  const [date, setDate] = useState(new Date())
  const [spent, setSpent] = useState('')
  const [workDescription, setWorkDescription] = useState('')

  const submitTimeLog = (e) => {
    e.preventDefault()

    onSubmit && onSubmit({
      projectId: selectedProjectId,
      workType,
      date,
      spent,
      workDescription
    })
  }

  return createPortal(
    <React.Fragment>
      <Overlay onClick={onOutsideClick} />
      <Container>
        <Card>
          <Card.Header>
            <h2>Log Time</h2>
            <Card.HeaderAction onClick={onCloseClick}>
              <FiX />
            </Card.HeaderAction>
          </Card.Header>
          <Card.Content>
            <Form onSubmit={submitTimeLog}>
              <Form.ItemGroup>
                <Form.Item>
                  <Form.Label>Project</Form.Label>
                  <Form.Select
                    value={selectedProjectId}
                    onInput={(e) => setSelectedProjectId(e.target.value)}>
                    {sortedProjects.map((project) => {
                      return (
                        <option key={project.id}
                          value={project.id}>
                          {project.name}
                        </option>
                      )
                    })}
                    <option value={0}>Other</option>
                  </Form.Select>
                </Form.Item>
                <Form.Item>
                  <Form.Label>Work Type</Form.Label>
                  <Form.Select
                    value={workType}
                    onInput={(e) => setWorkType(e.target.value)}>
                    <option value="sales">Sales</option>
                    <option value="development">Development</option>
                    <option value="testing">Testing</option>
                    <option value="support">Support</option>
                    <option value="studying">Studying</option>
                    <option value="other">Other</option>
                  </Form.Select>
                </Form.Item>
              </Form.ItemGroup>
              <Form.ItemGroup>
                <Form.Item>
                  <Form.Label>Date</Form.Label>
                  <Form.DatePicker
                    value={date.toLocaleDateString('en-CA')}
                    onChange={(e) => setDate(new Date(e.target.value))}
                  />
                </Form.Item>
                <Form.Item>
                  <Form.Label>Spent</Form.Label>
                  <Form.TextBox
                    value={spent}
                    onInput={(e) => setSpent(e.target.value)}
                  />
                </Form.Item>
              </Form.ItemGroup>
              <Form.Item>
                <Form.Label>Work Description</Form.Label>
                <Form.TextArea
                  value={workDescription}
                  onInput={(e) => setWorkDescription(e.target.value)}
                />
              </Form.Item>
              <Form.Item>
                <Button type="submit">Save</Button>
              </Form.Item>
            </Form>
          </Card.Content>
        </Card>
      </Container>
    </React.Fragment>,
    document.body
  )
}

export default TimeLog
