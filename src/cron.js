import 'dotenv/config'

import cron from 'node-cron'

import createConnection from './services/database'
import dayjs from './services/day'
import jira from './services/jira'

const cronState = {}

const normalizeStatus = (status) => {
  return status.toUpperCase().replace(/-/g, ' ')
}

const syncSalesJobs = async () => {
  console.log(`[syncSalesJobs] is starting at ${dayjs().format(jira.DATE_FORMAT)}`)

  if (cronState.syncSalesJobs) {
    console.log('[syncSalesJobs] is inprogress... exited')

    return
  }

  try {
    // start job
    cronState.syncSalesJobs = true

    // init database
    const connection = await createConnection()

    const {
      Project,
      SystemSetting
    } = connection.models

    const lastSyncAt = await SystemSetting.findOne({
      key: 'LAST_SYNC_AT'
    })

    if (!lastSyncAt?.value) {
      console.log('Missing LAST_SYNC_AT value')
      // return 
    }

    const syncState = {
      startAt: 0,
      canContinue: true,
      startSyncAt: dayjs().format(jira.DATE_FORMAT),
      lastSyncAt: lastSyncAt?.value || dayjs().subtract(1, 'M').format(jira.DATE_FORMAT)
    }

    do {
      const syncData = await jira.fetchSalesJobs(syncState.startAt, syncState.lastSyncAt)

      const {issues, ...meta} = syncData

      syncState.startAt += meta.maxResults
      syncState.canContinue = syncState.startAt <= meta.total

      // sync db
      await Promise.all([
        issues.map(async (issue) => {
          const project = await Project.findOneAndUpdate({
            jiraKey: issue.key,
            updatedAt: {
              $ne: issue.fields.updated
            }
          }, {
            createdAt: issue.fields.created,
            updatedAt: issue.fields.updated,
            name: issue.fields.summary,
            status: normalizeStatus(issue.fields.status.name),
            jiraData: issue
          }, {
            new: false,
            upsert: true
          })

          if (project) {
            console.log(`[${issue.key}] synchronized`)
          }
        })
      ])

    } while (syncState.canContinue)

    // update lastSyncAt
    await SystemSetting.findOneAndUpdate({
      key: 'LAST_SYNC_AT'
    }, {
      value: syncState.startSyncAt
    }, {
      upsert: true
    })
  } catch (e) {
    console.error(e)
  } finally {
    cronState.syncSalesJobs = false
  }
}

const main = () => {
  cron.schedule(process.env.CRON_PATTERN ||  '*/5 * * * *', syncSalesJobs)
}

main()
