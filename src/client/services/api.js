export const getProjectMeta = async () => {
  const res = await fetch('/api/projects/meta')
  const projects = await res.json()

  return {
    projects
  }
}

export const queryProjects = async (params) => {
  const querystring = new URLSearchParams()
  Object.entries(params).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((v) => querystring.append(key, v))
    } else {
      querystring.append(key, value)
    }
  })

  const res = await fetch(`/api/projects?${querystring.toString()}`)

  return await res.json()
}

export const getProject = async (params) => {
  const res = await fetch(`/api/projects/${params.id}`)

  const project = await res.json()

  return project
}

export const toggleStar = async (projectId) => {
  const res = await fetch(`/api/projects/${projectId}/toggle-star`, {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  })

  const starState = await res.json()

  return starState
}

export const createTimelog = async (data) => {
  const res = await fetch('/api/timelogs', {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  const timelog = await res.json()

  return timelog
}

export const fetchTimelogs = async () => {
  const res = await fetch('/api/timelogs')

  const timelogs = await res.json()

  return timelogs
}

export const updateTimelog = async (data) => {
  const res = await fetch(`/api/timelogs/${data._id}`, {
    method: 'put',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  const timelog = await res.json()

  return timelog
}
