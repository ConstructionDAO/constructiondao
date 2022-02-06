import { useEffect, useState } from 'react'
import { useMoralis } from 'react-moralis'
import CardVoted from './CardVoted'
import MintVote from './MintVote'

function Votes() {
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
    const Proposal = Moralis.Object.extend('Proposal')
    const query = new Moralis.Query(Proposal)
    query.find().then((results) => {
      if (user) {
        setProposal(results)
      }
    })

    // query.notEqualTo('owner', 'notactive')

    // query.equalTo("owner", user.get("ethAddress"));

    //   Moralis.Cloud.run("getDownloadTokens", {
    //     token_id: "0x7595656ba326543413e5288e6aAef08b60699A17",
    //   }).then((results) => {
    //     setAlbums(results);
    //     console.log(results);
    //   });
  }, [isAuthenticated, isWeb3Enabled, user])
  const [isVotes, setIsVotes] = useState(false)
  const [mintVotes, setMintVotes] = useState(true)
  const [voteBalance, setVoteBalance] = useState(false)

  function modalMintVote() {
    setIsVotes(false)
    setMintVotes(true)
  }

  function modalseeVotes() {
    setIsVotes(true)
    setMintVotes(false)
  }

  return (
    <div className="flex h-screen w-full flex-col items-center">
      <div className="flex flex-row space-x-48">
        {isVotes ? (
          <h1 className="mt-4 mb-8 text-xl font-extrabold italic text-gray-600 underline">
            Votes
          </h1>
        ) : (
          <h1
            onClick={modalseeVotes}
            className="mt-4 mb-8 text-xl font-extrabold italic text-gray-600 hover:cursor-pointer"
          >
            Votes
          </h1>
        )}
        {mintVotes ? (
          <h1 className="mt-4 mb-8 text-xl font-extrabold italic text-gray-600 underline">
            Mint CDAO
          </h1>
        ) : (
          <h1
            onClick={modalMintVote}
            className="mt-4 mb-8 text-xl font-extrabold italic text-gray-600 hover:cursor-pointer"
          >
            Mint CDAO
          </h1>
        )}
      </div>
      <div className="flex flex-row space-x-16"></div>
      {isVotes ? (
        <div className=" flex w-9/12 flex-col items-center justify-center">
          {proposal.map((data, index) => (
            <CardVoted data={data} key={index} />
          ))}
        </div>
      ) : (
        <div className=" flex w-9/12 flex-col items-center justify-center">
          <MintVote />
        </div>
      )}
    </div>
  )
}

export default Votes
