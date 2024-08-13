import 'dotenv/config'

import createConnection from '../services/database'
import dayjs from '../services/day'

const calculateTimelogCost = async ({
  db,
  salary
}) => {
  if (!salary) {
    return
  }

  const {
    Salary,
    Timelog
  } = db.models

  // calculate paidHours, hourlyRate
  const firstDayOfMonth = dayjs({
    day: 1,
    month: salary.month - 1,
    year: salary.year
  }).startOf('month')
  const lastDayOfMonth = firstDayOfMonth.endOf('month')

  const firstDay = dayjs(Math.max(firstDayOfMonth, salary.start || 0))
  const lastDay = dayjs(Math.min(lastDayOfMonth, salary.end || Number.MAX_SAFE_INTEGER))

  console.log(`Calculate cost for ${salary.email} from ${firstDay.format('YYYY/MM/DD')} to ${lastDay.format('YYYY/MM/DD')}...`)

  // paidHours
  const data = {
    count: 0,
    workingDays: 0
  }

  while (lastDay > firstDay.add(data.count, 'day')) {
    const weekDay = firstDay.add(data.count, 'day').day()

    if (weekDay !== 0 && weekDay !== 6) {
      data.workingDays++
    }

    data.count++
  }

  // update salary data
  const updatedSalary = await Salary.findOneAndUpdate({
    _id: salary._id
  }, {
    paidHours: data.workingDays * salary.hoursPerDay,
    hourlyRate: salary.gross / salary.hoursPerDay / data.workingDays
  }, {
    new: true
  })

  //get timelogs
  const timelogs = await Timelog.find({
    $and: [{
      email: salary.email
    }, {
      date: {
        $gte: firstDay
      }
    },{
      date: {
        $lt: lastDay
      }
    }]
  })

  // update
  await Promise.all(
    timelogs.map(async (timelog) => {
      await Timelog.findOneAndUpdate({
        _id: timelog._id
      }, {
        cost: timelog.spentAsSeconds / 60 / 60 * updatedSalary.hourlyRate
      })
    })
  )

  console.log(`Calculate cost for ${salary.email} from ${firstDay.format('YYYY/MM/DD')} to ${lastDay.format('YYYY/MM/DD')}... done`)
}

const main = async (params) => {
  const db = await createConnection()

  const {Salary} = db.models

  // find all salary records

  const salaries = await Salary.find(params)

  await salaries.reduce(async (lastTask, salary) => {
    await lastTask

    return calculateTimelogCost({
      db,
      salary
    })
  }, Promise.resolve())

  // exit after all jobs done
  await db.connection.close()
}

main({
  month: 7,
  year: 2024
})
