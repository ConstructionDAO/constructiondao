import { useMoralis, useNFTBalances } from 'react-moralis'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { CDAOAddress } from '../../contracts/CDAOContract'

function CDAOBalance(props) {
  //   const { data: NFTBalances } = useNFTBalances(props)
  const {
    account,
    isAuthenticated,
    user,
    isWeb3Enabled,
    isWeb3EnableLoading,
    enableWeb3,
    Moralis,
  } = useMoralis()

  if (!account || !isAuthenticated) return null

  //   console.log(NFTBalances)

  const [findCDAO, setFindCDAO] = useState()

  useEffect(() => {
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading) enableWeb3()

    if (user) {
      const PolygonNFTOwners = Moralis.Object.extend('PolygonNFTOwners')
      const query = new Moralis.Query(PolygonNFTOwners)
      query.equalTo('owner_of', user.get('ethAddress'))
      query.equalTo('token_id', '1')
      query.equalTo('token_address', CDAOAddress.toLowerCase())
      query.first().then((results) => {
        setFindCDAO(results.get('amount'))
        console.log(results)
      })
    }
  }, [user])

  return (
    <div className="z-50 flex w-56 max-w-2xl flex-row items-center justify-center space-x-2 rounded-xl border-2 border-blue-300/50 bg-transparent opacity-95 shadow-xl hover:border-blue-800">
      <div className="items-center justify-between space-x-2">{findCDAO}</div>
    </div>
  )
}

export default CDAOBalance
