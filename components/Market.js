import { useMoralis } from 'react-moralis'
import { useState, useEffect } from 'react'
import CardProjects from './CardProjects'

export default function Market() {
  const {
    user,
    Moralis,
    isWeb3Enabled,
    enableWeb3,
    isAuthenticated,
    isWeb3EnableLoading,
  } = useMoralis()

  const [proposal, setProposal] = useState([])

  useEffect(() => {
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading) enableWeb3()
    Moralis.Cloud.run('getProposals', {
      voter: user.get('ethAddress'),
    }).then((results) => {
      setProposal(results)
    })
  }, [isAuthenticated, isWeb3Enabled, user])

  return (
    <div className="flex h-screen w-full flex-col items-center overflow-y-scroll scrollbar-hide">
      <h1 className="mt-4 mb-8 text-xl font-extrabold italic text-gray-600">
        Active Proposals
      </h1>
      <div className=" flex w-9/12 flex-col items-center justify-center">
        {proposal.map((data, index) => (
          <CardProjects data={data} key={index} />
        ))}
      </div>
    </div>
  )
}
