import React, {
  useState
} from 'react'

import Button from 'components/button'
import Form from 'components/form'

import dayjs from 'services/day'

const TimelogForm = ({
  project,
  initialData = {},
  onSubmit,
}) => {
  // const sortedProjects = Object.values(projects)
  // const [selectedProjectId, setSelectedProjectId] = useState(initialData.projectId || sortedProjects[0]?._id)
  const [workType, setWorkType] = useState(initialData.workType)
  const [date, setDate] = useState(new Date(initialData.date))
  const [spent, setSpent] = useState(initialData.spent)
  const [workDescription, setWorkDescription] = useState(initialData.workDescription)

  const submitTimeLog = (e) => {
    e.preventDefault()

    onSubmit && onSubmit({
      ...initialData,
      // projectId: selectedProjectId,
      workType,
      date: date.toISOString(),
      spent,
      workDescription
    })
  }

  return (
    <Form onSubmit={submitTimeLog}>
      <Form.ItemGroup>
        <Form.Item>
          <Form.Label>Project</Form.Label>
          <Form.TextBox value={project.name} readOnly />
        </Form.Item>
        <Form.Item>
          <Form.Label>Work Type</Form.Label>
          <Form.Select
            value={workType}
            onInput={(e) => setWorkType(e.target.value)}>
            <option value="sales">Sales</option>
            <option value="presale">Presales</option>
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
            onChange={(e) => {
              setDate(dayjs(e.target.value).toDate())
            }}
          />
        </Form.Item>
        <Form.Item>
          <Form.Label>Spent (1d = 8h)</Form.Label>
          <Form.TextBox
            placeholder="Format: 2w 4d 6h 45m"
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

export default TimelogForm
