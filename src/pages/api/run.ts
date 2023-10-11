import * as dotenv from 'dotenv'
import { JWT } from 'google-auth-library'
import { GoogleSpreadsheet } from 'google-spreadsheet'
import type { NextApiRequest, NextApiResponse } from 'next'
dotenv.config()

const run = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const aa = process.env.GOOGLE_PRIVATE_KEY
  // eslint-disable-next-line no-console
  console.log('GOOGLE_PRIVATE_KEY', aa)

  const serviceAccountAuth = new JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  })

  const doc = new GoogleSpreadsheet(process.env.SHEET_ID, serviceAccountAuth)
  await doc.loadInfo()
  const sheet = doc.sheetsByTitle['テンプレート']
  // console.log(sheet)
  const copiedSheet = await sheet.copyToSpreadsheet(process.env.SHEET_ID)
  // eslint-disable-next-line no-console
  console.log(copiedSheet.data.sheetId)

  await doc.loadInfo()

  const sheets = doc.sheetsById
  // console.log(sheets)
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const targetSheet = sheets[`${copiedSheet.data.sheetId}`]
  // await targetSheet.updateProperties({ title: "過去推薦者から登録" })
  // await targetSheet.values.update(copiedSheet)
  await targetSheet.values.update()
  // await targetSheet.updateGridProperties({
  //   columnCount: 2,
  //   rowCount: 1,
  // })

  await res.status(200).json({ name: '/api/getNamelll' })
  res.end()
}

export default run
