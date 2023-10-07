import * as dotenv from 'dotenv'
import { JWT } from 'google-auth-library'
import { GoogleSpreadsheet } from 'google-spreadsheet'
import type { NextApiRequest, NextApiResponse } from 'next'
dotenv.config()

const run = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  // Initialize auth - see https://theoephraim.github.io/node-google-spreadsheet/#/guides/authentication
  const serviceAccountAuth = new JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  })

  const doc = new GoogleSpreadsheet(process.env.SHEET_ID, serviceAccountAuth)

  await doc.loadInfo() // loads document properties and worksheets
  console.log(doc.title)
  await doc.updateProperties({ title: 'github連携1' })

  const sheet = doc.sheetsByIndex[0] // or use `doc.sheetsById[id]` or `doc.sheetsByTitle[title]`
  console.log(sheet.title)
  console.log(sheet.rowCount)

  await res.status(200).json({ name: '/api/getNamelll' })
  res.end()
}

export default run
