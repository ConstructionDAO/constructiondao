import Head from 'next/head'
import Votes from '../components/Votes'
import TopFix from '../components/Topfix'
import { useMoralis } from 'react-moralis'
import { useEffect, useState } from 'react'
import Login from '../components/Login'
import Treasury from '../components/Treasury'

function treasury() {
  const {
    isWeb3Enabled,
    enableWeb3,
    isAuthenticated,
    isWeb3EnableLoading,
    Moralis,
    user,
  } = useMoralis()

  const [treasuryValue, setTreasuryValue] = useState()
  const [projectsFunded, setProjectsFunded] = useState()
  const [fundedTotal, setFundedTotal] = useState(0)

  useEffect(() => {
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading) enableWeb3()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    if (user) {
      Moralis.Cloud.run('treasuryValue', {}).then((results) => {
        setTreasuryValue(results)
      })
      Moralis.Cloud.run('projectsFunded', {}).then((results) => {
        setProjectsFunded(results)
      })
      Moralis.Cloud.run('fundedTotal', {}).then((results) => {
        console.log(results[0].total)
        if (results.length != 0) setFundedTotal(results[0].total)
      })
    }
  }, [isAuthenticated, isWeb3Enabled])

  if (!isAuthenticated) return <Login />

  return (
    <div className="h-screen overflow-y-scroll bg-gradient-to-b from-white via-white  to-blue-300 scrollbar-hide ">
      <Head>
        <title>Construction DAO - Treasury</title>
        <link rel="icon" href="/cdao-fin.svg" />
      </Head>
      <TopFix />
      <main className="flex h-screen overflow-y-scroll scrollbar-hide">
        <Treasury
          treasuryValue={treasuryValue}
          projectsFunded={projectsFunded}
          fundedTotal={fundedTotal}
        />
      </main>
    </div>
  )
}
export default treasury
