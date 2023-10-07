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

  const sheet = await doc.addSheet({ headerValues: ['pr'] })

  // append rows
  await sheet.addRow({ pr: 'larry@google.com' })

  await res.status(200).json({ name: '/api/getNamelll' })
  res.end()
}

export default run
