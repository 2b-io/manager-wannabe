import 'react-circular-progressbar/dist/styles.css'

import React, {
  useState
} from 'react'
import {CircularProgressbar} from 'react-circular-progressbar'
import {
  useDispatch,
  useSelector
} from 'react-redux'
import {
  FiCalendar,
  FiChevronLeft,
  FiChevronRight,
} from 'react-icons/fi'
import styled from 'styled-components'

import Card from 'components/card'
import DataTable from 'components/data-table'
import Text from 'components/text'

import dayjs from 'services/day'

const Wrapper = styled.div`
  text-align: center;
`

const CalendarCell = styled(({isWorkday, ...props}) => <div {...props} />)`
  position: relative;
  font-size: 2rem;
  padding: .5rem;

  ${({isWorkday}) => !isWorkday && `
    color: #ccc;
  `}

  .CircularProgressbar {
    position: absolute;
    width: 4rem;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`

const CalendarView = ({
  initialDate,
  spentByDate
}) => {
  const targetDate = dayjs(initialDate)
  const firstDayOfMonth = targetDate.startOf('month')
  const firstDayInCalendarView= firstDayOfMonth.startOf('week')

  const lastDayOfMonth = targetDate.endOf('month')
  const lastDayInCalendarView = lastDayOfMonth.endOf('week').add(1, 'd').startOf('day')

  const daysInCalendar = Math.floor(lastDayInCalendarView.diff(firstDayInCalendarView) / 1000 / 60 / 60 / 24)
  const weeksInCalendar = daysInCalendar / 7

  const daysInWeek = [
    firstDayInCalendarView.add(0, 'd').format('ddd'),
    firstDayInCalendarView.add(1, 'd').format('ddd'),
    firstDayInCalendarView.add(2, 'd').format('ddd'),
    firstDayInCalendarView.add(3, 'd').format('ddd'),
    firstDayInCalendarView.add(4, 'd').format('ddd'),
    firstDayInCalendarView.add(5, 'd').format('ddd'),
    firstDayInCalendarView.add(6, 'd').format('ddd'),
  ]

  const dates = []
  let ins = 0

  for (let i = 0; i < daysInCalendar; i++) {
    const d = i % 7
    const w = (i - d) / 7

    const date = firstDayInCalendarView.add(i, 'd')

    dates[w] = {
      ...(dates[w] || {w}),
      [daysInWeek[d]]: {
        value: date,
        isOutside: date.month() !== targetDate.month(),
        spent: spentByDate && spentByDate[date.format('YYYYMMDD')] || 0
      },
    }
  }

  const columns = daysInWeek.map((day) => {
    return {
      for: day,
      title: day,
      renderCell: (data, row, col) => {
        const isWorkday = data.spent > 0 || (col.for !== 'Sun' && col.for !== 'Sat')

        return (
          data.isOutside ? null : 
          <CalendarCell isWorkday={isWorkday}>
            {data.value.format('DD')}
            {isWorkday && data.spent && (
              <CircularProgressbar
                value={data.spent}
                maxValue={8*60*60}
                styles={{
                  path: {
                    stroke: '#ccc'
                  },
                  trail: {
                    stroke: 'whitesmoke'
                  }
                }}
              />
            ) || null}
          </CalendarCell>
        )
      }
    }
  })

  return (
    <Wrapper>
      <DataTable
        border={true}
        keyField="w"
        columns={columns}
        data={dates}
      />
    </Wrapper>
  )
}

const TimelogSummary = () => {
  const spentByDate = useSelector((state) => state.timelog.spentByDate)

  const [date, setDate] = useState(dayjs().startOf('month'))

  return (
    <Card loose>
      <Card.Header>
        <Text.PageTitle>Summary {date.format('MM/YYYY')}</Text.PageTitle>
        <Card.HeaderAction onClick={() => {
          setDate(() => date.subtract(1, 'M'))
        }}>
          <FiChevronLeft />
        </Card.HeaderAction>
        <Card.HeaderAction onClick={() => setDate(dayjs().startOf('month'))}>
          <FiCalendar />
        </Card.HeaderAction>
        <Card.HeaderAction onClick={() => setDate(date.add(1, 'M'))}>
          <FiChevronRight />
        </Card.HeaderAction>
      </Card.Header>
      <Card.Content>
        <CalendarView
          initialDate={date}
          spentByDate={spentByDate}
        />
      </Card.Content>
    </Card>
  )
}

export default TimelogSummary
