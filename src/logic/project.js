import mongoose from 'mongoose'

const singleProjectAggregate = ({email}) => [
  {
    $lookup: {
      from: 'timelogs',
      localField: '_id',
      foreignField: 'projectId',
      as: 'timelogs'
    }
  }, {
    $addFields: {
      starred: {
        $in: [
          email, {
            $ifNull: ['$starredBy', []]
          }
        ]
      }
    }
  },
  {
    $group: {
      _id: '$_id',
      totalSpentAsSeconds: {
        $sum: {
          $sum: '$timelogs.spentAsSeconds'
        }
      },
      emails: {
        $push: '$timelogs.email'
      },
      name: {
        $first: '$name'
      },
      status: {
        $first: '$status'
      },
      link: {
        $first: '$link'
      },
      starred: {
        $first: '$starred'
      },
      createdAt: {
        $first: '$createdAt'
      },
      updatedAt: {
        $first: '$updatedAt'
      }
    }
  }, {
    $unwind: '$emails'
  }, {
    $lookup: {
      from: 'users',
      localField: 'emails',
      foreignField: 'email',
      as: 'participants'
    }
  }
]

const fetch = async ({
  db,
  params,
  user
}) => {
  const {Project} = db.models

  const sortOpt = {
    // ...(VALID_SORT_OPTS[params.sort] || {}),
    _id: -1
  }

  const matchOpt = {
    ...(params.name ? {
      name: {
        $regex: new RegExp(params.name, 'i')
      }
    } : {}),
    ...(params.status ? {
      status: {
        $in: params.status
      }
    } : {}),
    ...(params.starred ? {
      starredBy: user.email
    } : {})
  }

  const projects = await Project.aggregate([
    {
      $match: matchOpt
    }, {
      $sort: sortOpt
    }, {
      $skip: params.skip
    }, {
      $limit: params.limit
    },
    ...singleProjectAggregate({
      email: user.email
    }), {
      $sort: sortOpt
    }
  ])

  const total = await Project.countDocuments(matchOpt)

  return {
    params,
    total,
    projects
  }
}

const get = async ({
  db,
  params,
  user
}) => {
  const {Project} = db.models

  const projects = await Project.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(params.id)
      }
    },
    ...singleProjectAggregate({
      email: user.email
    })
  ])

  return projects[0]
}

const fetchMeta = async ({db}) => {
  const {Project} = db.models

  const projects = await Project
    .find({})
    .select('_id name')

  return projects
}

const summarize = async ({
  db,
  params,
  user
}) => {
  const {
    Project,
    Timelog
  } = db.models

  const matchOpt = {
    projectId: new mongoose.Types.ObjectId(params.id)
  }

  const result = await Timelog.aggregate([
    {
      $facet: {
        effortAllocations: [
          {
            $match: matchOpt
          },
          {
            $group: {
              _id: '$email',
              totalSpendAsSeconds: {
                $sum: '$spentAsSeconds'
              }
            }
          },
          {
            $lookup: {
              from: 'users',
              localField: '_id',
              foreignField: 'email',
              as: 'user'
            }
          },
          {
            $unwind: '$user'
          }
        ],
        effortStructure: [
          {
            $match: {
              projectId: new mongoose.Types.ObjectId(params.id)
            }
          },
          {
            $group: {
              _id: '$workType',
              totalSpendAsSeconds: {
                $sum: '$spentAsSeconds'
              }
            }
          }
        ],
        costStructure: [
          {
            $match: {
              projectId: new mongoose.Types.ObjectId(params.id)
            }
          },
          {
            $group: {
              _id: '$workType',
              totalCost: {
                $sum: '$cost'
              }
            }
          }
        ],
        timelogs: [
          {
            $match: matchOpt
          },
          {
            $lookup: {
              from: 'users',
              localField: 'email',
              foreignField: 'email',
              as: 'user'
            }
          },
          {
            $unwind: '$user'
          }
        ],
        project: [
          {
            $match: {
              projectId: new mongoose.Types.ObjectId(params.id)
            }
          },
          {
            $group: {
              _id: '$projectId'
            }
          },
          {
            $lookup: {
              from: 'projects',
              localField: '_id',
              foreignField: '_id',
              as: 'project'
            }
          }, {
            $project: {
              project: { $first: '$project' }
            }
          }
        ]
      }
    }
  ])

  return result
}

export default {
  fetch,
  get,
  fetchMeta,
  summarize
}
