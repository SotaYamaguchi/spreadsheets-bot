import { setFailed } from '@actions/core'
import { getOctokit, context } from '@actions/github'

try {
  const gt = getOctokit(process.env?.GITHUB_TOKEN || '')
  console.log(context.payload)
  console.log(process.env)

  // PRのリンク作成
  // 作業者を取得
  // タイトル取得
  // 日付を取得
  // JIRAのURL

  // スプレッドシートに書き込み
} catch (error) {
  console.error(error)
  if (error instanceof Error) {
    setFailed(error?.message || '')
  }
}
