export function getGitlabToken() {
  const token = process.env['GITLAB_TOKEN']
  if (!token)
    throw new Error("GITLAB_TOKEN is not set")
  return token
}
