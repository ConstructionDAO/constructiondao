import { useMoralis } from 'react-moralis'
import { useRouter } from 'next/router'
import { useState } from 'react'

export default function Navbar() {
  const router = useRouter()

  // const [openProjects, setOpenProjects] = useState(false)
  // const [openProfile, setOpenProfile] = useState(false)
  // const [openVotes, setOpenVotes] = useState(false)
  // const [openProposals, setOpenProposals] = useState(false)

  function seeProjects() {
    router.push('/')
  }
  function seeProfile() {
    router.push('/profile')
  }
  function seeVotes() {
    router.push('/votes')
  }
  function seeProposals() {
    router.push('proposals')
  }

  return (
    <div className="lg:space-x-18 flex h-16 items-center justify-center space-x-16">
      <div className="flex flex-row space-x-12 rounded-xl bg-transparent bg-gray-200 p-2 lg:space-x-24">
        <button onClick={seeProjects}>Projects</button>

        <button onClick={seeProfile}>Profile</button>

        <button onClick={seeVotes}>Votes</button>

        <button onClick={seeProposals}>Proposal</button>
      </div>
    </div>
  )
}
