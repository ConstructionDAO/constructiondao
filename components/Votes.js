import { useState } from 'react'
import ERC20Balances from '../hooks/useERC20Balances'
import CardVoted from './CardVoted'
import MintVote from './MintVote'
import NativeBalance from './MoralisComponents/NativeBalance'

function Profile() {
  const [voted, setVoted] = useState(true)
  const [minting, setMinting] = useState(false)
  const [voteBalance, setVoteBalance] = useState(false)

  function openMintVote() {
    setMinting(true)
    setVoted(false)
    setVoteBalance(false)
  }
  function openVoted() {
    setMinting(false)
    setVoted(true)
    setVoteBalance(false)
  }
  function viewVoteBalance() {
    setMinting(false)
    setVoted(false)
    setVoteBalance(true)
  }
  return (
    <div className="flex h-screen w-full flex-col items-center">
      <div className="flex flex-row space-x-16">
        {/* {<button onClick={openVoted}>voted</button>} */}
        {/* {<button onClick={openMintVote}>get votes</button>}
        {<button onClick={viewVoteBalance}>vote balance</button>} */}
      </div>
      {voted && (
        <div className=" flex w-9/12 flex-col items-center justify-center">
          <CardVoted />
          <CardVoted />
        </div>
      )}
      {/* {minting && <MintVote />}
      {voteBalance && (
        <div className="flex w-4/12 flex-col items-center rounded-xl border-r border-b-2 border-white shadow-xl">
          <h1 className="my-4 ">Vote Balance</h1>
          <NativeBalance />
          <ERC20Balances />
        </div>
      )} */}
    </div>
  )
}

export default Profile
