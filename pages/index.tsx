import Head from 'next/head'
import Login from '../components/Login'
import { useMoralis } from 'react-moralis'
import TopFix from '../components/TopFix'
import Market from '../components/Market'

import { useEffect } from 'react'

export default function Home() {
  const { isWeb3Enabled, enableWeb3, isAuthenticated, isWeb3EnableLoading } =
    useMoralis()

  useEffect(() => {
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading) enableWeb3()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isWeb3Enabled])

  if (!isAuthenticated) return <Login />

  return (
    <div className="h-screen overflow-hidden bg-gradient-to-b from-white  via-white to-blue-300 ">
      <Head>
        <title>Construction Dao</title>
        <link rel="icon" href="/construct.png" />
      </Head>
      <TopFix />
      <main className="flex h-screen overflow-y-scroll scrollbar-hide">
        <Market />
      </main>
    </div>
  )
}
