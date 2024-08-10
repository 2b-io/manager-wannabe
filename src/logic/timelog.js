import dayjs from '../services/day'
import workingTime from '../services/working-time'

const notify = async ({
  db,
  timelog,
  user
}) => {
  try {
    const {Project} = db.models

    const project = await Project.findById(timelog.projectId)

    if (!project) {
      throw new Error('Project Not Found')
    }

    // const userName = user.profiles?.google ?
    //   `<users/${user.profiles.google.id}>` :
    //   `\`${user.email}\``
    const userName = user.profiles?.google ?
      `*${user.profiles.google.displayName}*` :
      `\`${user.email}\``

    const message = `${userName} spent \`${timelog.spent} \` on \`${project.name} \``

    const res = await fetch(process.env.GOOGLE_CHAT_WEBHOOK, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      },
      body: JSON.stringify({
        text: message,
        cardsV2: [{
          cardId: timelog._id.toString(),
          card: {
            sections: [
              {
                header: `Timelog [${timelog._id.toString()}]`,
                widgets: [
                  {
                    decoratedText: {
                      text: user.email,
                      ...(user.profiles?.google ? {
                        icon: {
                          iconUrl: user.profiles.google.picture
                        }
                      } : {
                        startIcon: {
                          materialIcon: {
                            name: 'mail',
                            fill: true,
                            weight: 400
                          }
                        }
                      })
                    }
                  },
                  {
                    decoratedText: {
                      text: dayjs(timelog.date).format('YYYY/MM/DD'),
                      startIcon: {
                        materialIcon: {
                          name: 'calendar_month',
                          fill: true,
                          weight: 400
                        }
                      }
                    }
                  },
                  {
                    decoratedText: {
                      text: timelog.spent,
                      startIcon: {
                        materialIcon: {
                          name: 'timer',
                          fill: true,
                          weight: 400
                        }
                      }
                    }
                  },
                  {
                    decoratedText: {
                      text: project.name,
                      startIcon: {
                        materialIcon: {
                          name: 'work',
                          fill: true,
                          weight: 400
                        }
                      }
                    }
                  }
                ]
              },
              (timelog.workDescription ? {
                widgets: [
                  {
                    textParagraph: {
                      text: timelog.workDescription
                    }
                  }
                ]
              }: null)
            ].filter(Boolean)
          }
        }]
      })
    })

    const result = await res.json()

    return result
  } catch (e) {
    console.error(e)
  }
}

const create = async ({
  db,
  params,
  user
}) => {
  const {Timelog} = db.models

  const data = {
    ...params,
    email: user.email
  }

  data.spentAsSeconds = workingTime.toNumber(data.spent)
  // normalize
  data.spent = workingTime.toString(data.spentAsSeconds)

  const timelog = data._id ?
    (await Timelog.findByIdAndUpdate(data._id, data, {new: true})) :
    (await Timelog.create(data))

  notify({
    db,
    timelog,
    user
  })

  return timelog
}

const update = async ({
  db,
  id,
  params,
  user
}) => {
  const {Timelog} = db.models

  const data = {
    ...params,
    forceUnlocked: false
  }

  data.spentAsSeconds = workingTime.toNumber(data.spent)
  // normalize
  data.spent = workingTime.toString(data.spentAsSeconds)

  const timelog = await Timelog.findByIdAndUpdate(id, data, {
    new: true
  })

  notify({
    db,
    timelog,
    user
  })

  return timelog
}

export default {
  create,
  update
}
