const createAuthHeader = () => {
  const identifier = process.env.ATLASSIAN_USER + ':' + process.env.ATLASSIAN_API_TOKEN
  const based64Identifier = Buffer.from(identifier).toString('base64')

  return {
    'Authorization': `Basic ${based64Identifier}`
  }
}

const fetchSalesJobs = async (startAt, updatedFrom) => {
  const jql = `
    project = "BIZ" AND 
    type = "Sale Job" AND 
    updated >= "${updatedFrom}"
    ORDER BY created DESC
  `

  const url = new URL(`${process.env.ATLASSIAN_API_HOST}/search`)

  url.searchParams.append('jql', jql)
  url.searchParams.append('startAt', startAt || 0)

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      ...createAuthHeader(),
      'Content-Type': 'application/json'
    }
  })

  const data = await res.json()

  return data
}

export default {
  DATE_FORMAT: 'YYYY-MM-DD HH:mm',
  fetchSalesJobs
}
