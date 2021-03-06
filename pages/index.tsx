import Head from 'next/head'
import Login from '../components/Login'
import { useMoralis } from 'react-moralis'
import Header from '../components/Header'
import Navbar from '../components/Navbar'
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
    <div className="h-screen overflow-y-scroll bg-gradient-to-b from-white via-white  to-blue-300 scrollbar-hide ">
      <Head>
        <title>Construction DAO - Home</title>
        <link rel="icon" href="/cdao-fin.svg" />
      </Head>
      <div className="sticky">
        <Header />
        <Navbar />
      </div>
      <main className="flex h-screen">
        <Market />
      </main>
    </div>
  )
}
