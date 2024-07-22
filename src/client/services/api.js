export const fetchProjects = async () => {
  const res = await fetch('/api/projects')

  const projects = await res.json()

  return projects
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
