import { setFailed } from '@actions/core'
import { getOctokit, context } from '@actions/github'

try {
  const gt = getOctokit(process.env?.GITHUB_TOKEN || '')
  console.log(context.payload)
  console.log(process.env)
} catch (error) {
  if (error instanceof Error) {
    console.error(error)
    setFailed(error?.message || '')
  }
}
