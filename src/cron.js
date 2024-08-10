import 'dotenv/config'

import cron from 'node-cron'

import remindLogTime from './jobs/remind'
import syncSalesJobs from './jobs/sync'

const cronJobs = [{
  name: 'Sync JIRA',
  pattern: process.env.CRON_PATTERN_SYNC,
  task: syncSalesJobs
}, {
  name: 'Remind log time',
  pattern: process.env.CRON_PATTERN_REMIND,
  task: remindLogTime
}]

const main = () => {
  console.log('Cron started...')

  cronJobs.forEach((data) => {
    if (!data.pattern || !data.task) {
      return
    }

    cron.schedule(data.pattern, data.task.bind(null, data), {
      scheduled: true,
      timezone: 'Asia/Bangkok'
    })
  })
}

main()
