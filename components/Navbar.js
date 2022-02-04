import { useMoralis } from 'react-moralis'
import { useRouter } from 'next/router'
import { useState } from 'react'

export default function Navbar() {
  const router = useRouter()

  const [openProjects, setOpenProjects] = useState(false)
  const [openProfile, setOpenProfile] = useState(false)
  const [openVotes, setOpenVotes] = useState(false)
  const [openProposals, setOpenProposals] = useState(false)

  function seeProjects() {
    router.push('/')
    setOpenProjects(true)
    setOpenProfile(false)
    setOpenVotes(false)
    setOpenProposals(false)
  }
  function seeProfile() {
    router.push('/profile')
    setOpenProfile(true)
    setOpenProjects(false)
    setOpenVotes(false)
    setOpenProposals(false)
  }
  function seeVotes() {
    router.push('/votes')
    setOpenProfile(false)
    setOpenProjects(false)
    setOpenVotes(true)
    setOpenProposals(false)
  }
  function seeProposals() {
    router.push('proposals')
    setOpenProfile(false)
    setOpenProjects(false)
    setOpenVotes(false)
    setOpenProposals(true)
  }

  return (
    <div className="lg:space-x-18 mb-8 flex h-16 items-center justify-center space-x-16">
      <div className="flex flex-row space-x-12 rounded-xl bg-transparent lg:space-x-24">
        {openProjects ? (
          <button
            className="rounded-xl bg-orange-100 px-2 text-orange-800"
            onClick={seeProjects}
          >
            Projects
          </button>
        ) : (
          <button onClick={seeProjects}>Projects</button>
        )}
        {openProfile ? (
          <button
            className="rounded-xl bg-orange-100 px-2 text-orange-800"
            onClick={seeProfile}
          >
            Profile
          </button>
        ) : (
          <button onClick={seeProfile}>Profile</button>
        )}
        {openVotes ? (
          <button
            className="rounded-xl bg-orange-100 px-2 text-orange-800"
            onClick={seeVotes}
          >
            Votes
          </button>
        ) : (
          <button onClick={seeVotes}>Votes</button>
        )}
        {openProposals ? (
          <button
            className="rounded-xl bg-orange-100 px-2 text-orange-800"
            onClick={seeProposals}
          >
            Proposals
          </button>
        ) : (
          <button onClick={seeProposals}>Proposal</button>
        )}
      </div>
    </div>
  )
}
