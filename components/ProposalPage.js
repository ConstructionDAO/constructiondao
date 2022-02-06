import { useEffect, useState } from 'react'
import { useMoralis } from 'react-moralis'
import CardVoted from './CardVoted'
import MintProposal from './MintProposal'

function ProposalPage() {
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
    // const Proposal = Moralis.Object.extend('Proposal')
    // const query = new Moralis.Query(Proposal)
    // query.equalTo('walletAddress', user.get('ethAddress'))
    // query.equalTo('active', true)
    // query.find().then((results) => {
    //   if (user) {
    //     setProposal(results)
    //   }
    // })

    // query.notEqualTo('owner', 'notactive')

    Moralis.Cloud.run('getMyProposals', {
      voter: user.get('ethAddress'),
    }).then((results) => {
      setProposal(results)
    })
  }, [isAuthenticated, isWeb3Enabled, user])
  const [isNew, setIsNew] = useState(true)
  const [isCreated, setIsCreated] = useState(false)
  const [voteBalance, setVoteBalance] = useState(false)

  function modalMintVote() {
    setIsNew(false)
    setIsCreated(true)
  }

  function modalseeVotes() {
    setIsNew(true)
    setIsCreated(false)
  }

  return (
    <div className="flex h-screen w-full flex-col items-center">
      <div className="flex flex-row space-x-48">
        {isCreated ? (
          <h1 className="mt-4 mb-8 text-xl font-extrabold italic text-gray-600 underline">
            Your Proposals
          </h1>
        ) : (
          <h1
            onClick={modalMintVote}
            className="mt-4 mb-8 text-xl font-extrabold italic text-gray-600 hover:cursor-pointer"
          >
            Your Proposals
          </h1>
        )}
        {isNew ? (
          <h1 className="mt-4 mb-8 text-xl font-extrabold italic text-gray-600 underline">
            Mint Proposal
          </h1>
        ) : (
          <h1
            onClick={modalseeVotes}
            className="mt-4 mb-8 text-xl font-extrabold italic text-gray-600 hover:cursor-pointer"
          >
            Mint Proposal
          </h1>
        )}
      </div>
      <div className="flex flex-row space-x-16">
        {/* {<button onClick={openVoted}>voted</button>} */}
        {/* {<button onClick={openMintVote}>get votes</button>}
        {<button onClick={viewVoteBalance}>vote balance</button>} */}
      </div>
      {isCreated ? (
        <div className=" flex w-9/12 flex-col items-center justify-center">
          {proposal.map((data, index) => (
            <CardVoted data={data} key={index} />
          ))}
        </div>
      ) : (
        <div className=" flex w-9/12 flex-col items-center justify-center">
          <MintProposal />
        </div>
      )}
    </div>
  )
}

export default ProposalPage
