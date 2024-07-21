export const fetchProjects = async () => {
  const res = await fetch('/api/projects')

  const projects = await res.json()

  return projects
}
