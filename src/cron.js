import 'dotenv/config'

import cron from 'node-cron'

import syncSalesJobs from './jobs/sync'

const main = () => {
  console.log('Cron started')

  cron.schedule(process.env.CRON_PATTERN ||  '*/5 * * * *', syncSalesJobs)
}

main()
