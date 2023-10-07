'use client'
import { NextPage } from 'next'
import { FlexLayout } from '../parts/FlexLayout'

const Home: NextPage = () => {
  const handleClick = () => {
    fetch('/api/run').then((res) => {
      console.log(res)
    })
  }
  return (
    <FlexLayout direction="column">
      <button onClick={handleClick}>run</button>
    </FlexLayout>
  )
}

export default Home
