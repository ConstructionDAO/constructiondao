import { useMoralis } from 'react-moralis'
import { useState, useEffect } from 'react'
import Bottom from '../components/Bottom'

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

  const [proposal, setAlbums] = useState([])

  useEffect(() => {
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading) enableWeb3()
    const Proposal = Moralis.Object.extend('Proposal')
    const query = new Moralis.Query(Proposal)
    query.notEqualTo('owner', 'notactive')
    // query.equalTo("owner", user.get("ethAddress"));

    //   Moralis.Cloud.run("getDownloadTokens", {
    //     token_id: "0x7595656ba326543413e5288e6aAef08b60699A17",
    //   }).then((results) => {
    //     setAlbums(results);
    //     console.log(results);
    //   });
  }, [isAuthenticated, isWeb3Enabled, user])

  return (
    <div className="flex h-screen w-full flex-col items-center">
      <h1 className="mt-4 mb-8 text-xl font-extrabold italic text-gray-600">
        Proposals
      </h1>
      <div className=" flex w-9/12 flex-col items-center justify-center">
        {proposal.map((data, index) => (
          <CardProjects data={data} key={index} />
        ))}
        <CardProjects />
        <CardProjects />
        <CardProjects />
        <CardProjects />
        <CardProjects />
        <Bottom />
      </div>
    </div>
  )
}
