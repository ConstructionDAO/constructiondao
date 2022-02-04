import Head from 'next/head'
import MintProposal from '../components/MintProposal'
import TopFix from '../components/Topfix'
import { useMoralis } from 'react-moralis'
import { useEffect } from 'react'

function proposals() {
  const { isWeb3Enabled, enableWeb3, isAuthenticated, isWeb3EnableLoading } =
    useMoralis()

  useEffect(() => {
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading) enableWeb3()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isWeb3Enabled])

  //   if (!isAuthenticated) return <Login />

  return (
    <div className="h-screen overflow-hidden bg-gradient-to-b from-white  via-white to-blue-300 ">
      <Head>
        <title>Construct Dao</title>
        <link rel="icon" href="/construct.png" />
      </Head>
      <TopFix />
      <main className="flex h-screen overflow-y-scroll scrollbar-hide">
        <MintProposal />
      </main>
    </div>
  )
}
export default proposals
