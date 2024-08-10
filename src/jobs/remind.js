import mongoose from 'mongoose'

import createConnection from '../services/database'
import dayjs from '../services/day'

const cronState = {}

const remindLogTime = async (info) => {
  console.log(`[${info.name}] is starting at ${dayjs().format('YYYY-MM-DD HH:mm:ss')}`)

  if (cronState.started) {
    console.log(`[${info.name}] is inprogress... exited`)

    return
  }

  try {
    cronState.started = true

    // init database
    const connection = await createConnection()

    const {
      SystemSetting,
      Timelog,
      User
    } = connection.models

    const today = dayjs().startOf('day')

    // get who logs time today
    const summary = await Timelog.aggregate([
      {
        $match: {
          $and: [
            {
              date: {
                $gte: today.toDate()
              }
            },
            {
              date: {
                $lt: today.add(1, 'd').toDate()
              }
            }
          ]
        }
      },
      {
        $group: {
          _id: '$email'
        }
      }
    ])

    const emails = summary.map(({_id}) => _id)

    // get who don't log time today
    const users = await User.find({
      email: {
        $nin: emails
      }
    })

    const {value: reminderMessages} = await SystemSetting.findOne({
      key: 'REMINDER_MESSAGES'
    })

    const reminderMessage = reminderMessages[Math.floor(Math.random() * reminderMessages.length)]

    const message = [
      `[${today.format('YYYY/MM/DD')}] ${reminderMessage}`,
      '',
      users.reduce((mentions, user) => {
        return [
          ...mentions, (
          user.profiles?.google ?
            `<users/${user.profiles.google.id}>` :
            `${user.email}`
          )
        ]
      }, []).join(' ')
    ].join("\n")

    const res = await fetch(process.env.GOOGLE_CHAT_WEBHOOK, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      },
      body: JSON.stringify({
        text: message
      })
    })

    const data = await res.json()

    console.log(data)
  } catch(e) {
    console.error(e)
  } finally {
    cronState.started = false
  }
}

export default remindLogTime
