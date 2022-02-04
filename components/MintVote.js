import { useState } from 'react'
import { useMoralisFile, useMoralis } from 'react-moralis'
// import { TokenABI, TokenAddress } from '../../contracts/TokenContract'
// import {
//   MarketplaceABI,
//   marketplaceAddress,
// } from '../../contracts/MarketplaceContract'
import UploadConfirmed from './Mints/UploadConfirmed'
import PictureDone from './Mints/PictureDone'
import UploadStarted from './Mints/UploadStarted'

function MintVote() {
  const { saveFile } = useMoralisFile()
  const { account, Moralis, user } = useMoralis()
  //   async function contractCall(object) {
  //     const web3Provider = await Moralis.enableWeb3()
  //     const ethers = Moralis.web3Library

  //     const contract = new ethers.Contract(
  //       TokenAddress,
  //       TokenABI,
  //       web3Provider.getSigner()
  //     )

  //     const price = ethers.utils.parseEther(object.get('recordPrice').toString())

  //     contract
  //       .createAlbum(
  //         object.id,
  //         object.get('recordCount'),
  //         '4',
  //         price,
  //         object.get('royaltyPrice')
  //       )
  //       .then((result) => {
  //         contract.setApprovalForAll(marketplaceAddress, true)
  //         alert(
  //           'successful, please confirm direct approval for marketplace via metamask'
  //         )
  //         setUploadDone(true)
  //         alert(
  //           "You find the item in your collection. From there you'll be able to list it on the marketplace"
  //         )
  //       })
  //   }
  async function createVote() {
    const numberOfVotes = document.getElementById('numberOfVotes').value

    const metadata = {
      name: numberOfVotes,
    }
    const metadataFile = new Moralis.File('metadata.json', {
      base64: btoa(JSON.stringify(metadata)),
    })
    await metadataFile.saveIPFS()
    const metadataURI = metadataFile.ipfs()

    const Votes = new Moralis.Object.extend('Votes')
    const votes = new Votes()

    votes.set('numberOfVotes', numberOfVotes)
    votes.save().then((object) => {
      // contractCall(object)
      console.log(object)
    })
  }

  return (
    <div className="flex w-full flex-col items-center text-black">
      <div className="flex w-6/12 flex-col items-center justify-center rounded-xl border-r border-b-2 shadow-xl">
        <div className="mx-2 mt-2 w-11/12 items-center border-b border-blue-600 py-2 text-center text-lg font-bold text-gray-800 ">
          Mint Votes
        </div>
        <div className="mt-4 mb-4 flex w-full flex-col items-center justify-center space-y-4">
          <div className=" flex w-11/12 flex-row justify-evenly">
            <div className="mt-4 mb-4 flex w-full flex-col items-center justify-center space-y-4">
              <p className="flex flex-col items-center justify-center space-y-4">
                <p className="truncate-overflow flex flex-wrap items-center justify-center">
                  You require CDAO Governance Tokens to vote or create a
                  proposal
                </p>
                <p>1 CDAO = 1 DAO</p>
              </p>
              <div className="z-50 flex w-4/12 max-w-2xl flex-col rounded-xl border-2 border-blue-300/50 bg-transparent px-4 py-1 opacity-95 shadow-xl hover:border-blue-800 ">
                <input
                  name="numberOfVotes"
                  id="numberOfVotes"
                  type="number"
                  placeholder="Number Of Votes"
                  className="outline:none bg-transparent text-center focus:outline-none"
                />
              </div>
            </div>
          </div>
          <div className="flex w-11/12 flex-col border-b border-blue-600 py-1"></div>
          <div className="flex w-full flex-col items-center justify-center space-y-4 text-white">
            <div className="mx-4 rounded-xl border-b-2 border-black bg-blue-300 p-2 px-4 text-sm text-black">
              <button onClick={createVote}>Mint CDAO</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MintVote
