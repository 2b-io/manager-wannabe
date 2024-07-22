import React, {
  useState
} from 'react'

import Button from 'components/button'
import Form from 'components/form'

const Timelog = ({
  projects,
  initialData = {},
  onSubmit,
}) => {
  const sortedProjects = Object.values(projects)
  const [selectedProjectId, setSelectedProjectId] = useState(initialData.projectId)
  const [workType, setWorkType] = useState(initialData.workType)
  const [date, setDate] = useState(initialData.date)
  const [spent, setSpent] = useState(initialData.spent)
  const [workDescription, setWorkDescription] = useState(initialData.workDescription)

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

  return (
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
            value={date?.toLocaleDateString('en-CA')}
            onChange={(e) => setDate(new Date(e.target.value))}
          />
        </Form.Item>
        <Form.Item>
          <Form.Label>Spent</Form.Label>
          <Form.TextBox
            placeholder="Use the format: 2w 4d 6h 45m"
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
  )
}

export default Timelog
