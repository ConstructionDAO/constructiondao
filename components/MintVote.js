// import { useState } from 'react'
// import { useMoralisFile, useMoralis } from 'react-moralis'
// // import { TokenABI, TokenAddress } from '../../contracts/TokenContract'
// // import {
// //   MarketplaceABI,
// //   marketplaceAddress,
// // } from '../../contracts/MarketplaceContract'
// import UploadConfirmed from './Mints/UploadConfirmed'
// import PictureDone from './Mints/PictureDone'
// import UploadStarted from './Mints/UploadStarted'

// function MintVote() {
//   const { saveFile } = useMoralisFile()
//   const { account, Moralis, user } = useMoralis()

//   const [isUploading, setIsUploading] = useState(false)
//   const [pictureDone, setPictureDone] = useState(false)
//   const [uploadDone, setUploadDone] = useState(false)

//   //   async function contractCall(object) {
//   //     const web3Provider = await Moralis.enableWeb3()
//   //     const ethers = Moralis.web3Library

//   //     const contract = new ethers.Contract(
//   //       TokenAddress,
//   //       TokenABI,
//   //       web3Provider.getSigner()
//   //     )

//   //     const price = ethers.utils.parseEther(object.get('recordPrice').toString())

//   //     contract
//   //       .createAlbum(
//   //         object.id,
//   //         object.get('recordCount'),
//   //         '4',
//   //         price,
//   //         object.get('royaltyPrice')
//   //       )
//   //       .then((result) => {
//   //         contract.setApprovalForAll(marketplaceAddress, true)
//   //         alert(
//   //           'successful, please confirm direct approval for marketplace via metamask'
//   //         )
//   //         setUploadDone(true)
//   //         alert(
//   //           "You find the item in your collection. From there you'll be able to list it on the marketplace"
//   //         )
//   //       })
//   //   }
//   async function createVote() {
//     setIsUploading(true)

//     const voteTitle = document.getElementById('voteTitle').value
//     const description = document.getElementById('description').value
//     const votePicture = document.getElementById('votePicture').files[0]
//     let ipfsCover = ''

//     if (votePicture) {
//       console.log('uploading vote pic')
//       await saveFile('votePicture', votePicture, { saveIPFS: true }).then(
//         async (hash) => {
//           console.log(hash)
//           ipfsCover = hash._ipfs
//         }
//       )
//       console.log('cover done, now uploading files')
//       setIsUploading(false)
//       setPictureDone(true)
//     }
//     const metadata = {
//       name: voteTitle,
//       image: ipfsCover,
//       description: description,
//     }
//     const metadataFile = new Moralis.File('metadata.json', {
//       base64: btoa(JSON.stringify(metadata)),
//     })
//     await metadataFile.saveIPFS()
//     const metadataURI = metadataFile.ipfs()
//     setPDFDone(false)

//     const Proposal = new Moralis.Object.extend('Proposal')
//     const proposal = new Proposal()

//     proposal.set('voteTitle', voteTitle)
//     proposal.set('description', description)
//     proposal.set('votePicture', ipfsCover)
//     proposal.save().then((object) => {
//       // contractCall(object)
//       console.log(object)
//     })
//   }

//   return (
//     <div className="flex w-full flex-col items-center text-black">
//       <div className="flex w-4/12 flex-col items-center justify-center rounded-xl border-r border-b-2 shadow-xl">
//         <div className="mx-2 mt-2 w-11/12 items-center border-b border-orange-600 py-2 text-center text-lg font-bold text-gray-800 ">
//           Mint Vote
//         </div>
//         <div className="mt-4 mb-4 flex w-full flex-col items-center justify-center space-y-4">
//           <div className=" flex w-11/12 flex-row justify-evenly">
//             <div className="mt-4 mb-4 flex w-full flex-col items-center justify-center space-y-4">
//               <div className="z-50 flex w-9/12 max-w-2xl flex-col rounded-xl border-2 border-orange-300/50 bg-transparent px-4 py-1 opacity-95 shadow-xl hover:border-orange-800">
//                 <input
//                   name="voteTitle"
//                   id="voteTitle"
//                   type="text"
//                   placeholder="Project Title"
//                   className="outline:none bg-transparent text-center  focus:outline-none"
//                 />
//               </div>
//               <div className="z-50 flex w-9/12 max-w-2xl flex-col rounded-xl border-2 border-orange-300/50 bg-transparent px-4 py-1 opacity-95 shadow-xl hover:border-orange-800 ">
//                 <textarea
//                   name="description"
//                   id="description"
//                   type="textarea"
//                   placeholder="Description"
//                   className="outline:none bg-transparent text-center focus:outline-none"
//                 />
//               </div>
//               <div className="mt-4"></div>
//               <p>Vote Picture</p>
//               <div className="z-50 flex w-9/12 max-w-2xl flex-col rounded-xl border-2 border-orange-300/50 bg-transparent px-4 py-1 opacity-95 shadow-xl hover:border-orange-800">
//                 <input
//                   type="file"
//                   name="votePicture"
//                   id="votePicture"
//                   placeholder="Cover Vote"
//                   className="outline:none bg-transparent text-center focus:outline-none"
//                 />
//               </div>
//             </div>
//           </div>
//           <div className="flex w-11/12 flex-col border-b border-orange-600 py-1"></div>
//           <div className="flex w-full flex-col items-center justify-center space-y-4 text-white">
//             <div className="mx-4 rounded-xl border-b-2 border-black bg-orange-600 p-2 px-4 text-sm text-black">
//               <button onClick={createVote}>Mint Vote</button>
//             </div>
//             {isUploading && <UploadStarted />}
//             {pictureDone && <PictureDone />}
//             {uploadDone && <UploadConfirmed />}
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default MintVote
