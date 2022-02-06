import Head from 'next/head'
import Profile from '../components/Profile'
import TopFix from '../components/Topfix'
import Login from '../components/Login'
import { useMoralis } from 'react-moralis'
import { useEffect } from 'react'

function profile() {
  const { isWeb3Enabled, enableWeb3, isAuthenticated, isWeb3EnableLoading } =
    useMoralis()

  useEffect(() => {
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading) enableWeb3()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isWeb3Enabled])

  //   if (!isAuthenticated) return <Login />
  if (!isAuthenticated) return <Login />

  return (
    // <div className="bg-gradient-to-l from-gray-100 via-teal-800 to-teal-800  h-screen overflow-hidden">
    <div className="h-screen overflow-y-scroll bg-gradient-to-b from-white via-white  to-blue-300 scrollbar-hide ">
      <Head>
        <title>Construction DAO - Profile</title>
        <link rel="icon" href="/cdao-fin.svg" />
      </Head>
      <TopFix />
      <main className="flex h-screen ">
        <Profile />
      </main>
    </div>
  )
}
export default profile
