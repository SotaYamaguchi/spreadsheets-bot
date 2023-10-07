import { setFailed } from '@actions/core'
import { getOctokit, context } from '@actions/github'
import { JWT } from 'google-auth-library'
import { GoogleSpreadsheet } from 'google-spreadsheet'
;(async () => {
  try {
    const gt = getOctokit(process.env?.GITHUB_TOKEN || '')
    console.log(context.payload.pull_request?.html_url)

    // Initialize auth - see https://theoephraim.github.io/node-google-spreadsheet/#/guides/authentication
    const serviceAccountAuth = new JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    })

    const doc = new GoogleSpreadsheet(process.env.SHEET_ID, serviceAccountAuth)
    const sheet = await doc.addSheet({ headerValues: ['pr'] })
    await sheet.addRow({ pr: context.payload.pull_request?.html_url || '' })
  } catch (error) {
    if (error instanceof Error) {
      console.error(error)
      setFailed(error?.message || '')
    }
  }
})()
