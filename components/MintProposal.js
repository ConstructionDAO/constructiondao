import { useState } from 'react'
import { useMoralisFile, useMoralis } from 'react-moralis'
import UploadConfirmed from './Mints/UploadConfirmed'
import PictureDone from './Mints/PictureDone'
import UploadStarted from './Mints/UploadStarted'
import PDFDone from './Mints/PDFDone'
import {
  ConstructionABI,
  ConstructionAddress,
} from '../contracts/ProposalContract'

function MintProposal() {
  const { saveFile } = useMoralisFile()
  const { account, Moralis, user } = useMoralis()

  const [isUploading, setIsUploading] = useState(false)
  const [pictureDone, setPictureDone] = useState(false)
  const [pdfDone, setPDFDone] = useState(false)
  const [uploadDone, setUploadDone] = useState(false)

  async function contractCall(object) {
    const web3Provider = await Moralis.enableWeb3()
    const ethers = Moralis.web3Library

    const contractProposal = new ethers.Contract(
      ConstructionAddress,
      ConstructionABI,
      web3Provider.getSigner()
    )
    contractProposal
      .createProposal(
        object.id,
        object.get('projectPDF'),
        object.get('numberOfDays'),
        object.get('fundingGoal')
      )
      .then((result) => {
        alert('proposal created')
      })
  }

  async function createProposal() {
    setIsUploading(true)

    const projectTitle = document.getElementById('projectTitle').value
    const description = document.getElementById('description').value
    const projectPicture = document.getElementById('projectPicture').files[0]
    const fundingGoal = document.getElementById('fundingGoal').value
    const projectPDF = document.getElementById('projectPDF').files[0]
    const projectFounder = document.getElementById('projectFounder').value
    const walletAddress = user.get('ethAddress')
    const numberOfDays = document.getElementById('numberOfDays').value * 86400

    let ipfsCover = ''
    let ipfsFiles = ''

    if (projectPicture) {
      console.log('uploading cover')
      await saveFile('projectPicture', projectPicture, { saveIPFS: true }).then(
        async (hash) => {
          console.log(hash)
          ipfsCover = hash._ipfs
        }
      )
      console.log('cover done, now uploading files')
      setIsUploading(false)
      setPictureDone(true)
    }
    if (projectPDF) {
      await saveFile('projectPDF', projectPDF, { saveIPFS: true }).then(
        async (hash) => {
          console.log(hash)
          ipfsFiles = hash._ipfs
        }
      )
      console.log('done uploading')
      setPictureDone(false)
      setPDFDone(true)
    }
    const metadata = {
      name: projectTitle,
      image: ipfsCover,
      description: description,
      fundingGoal: fundingGoal,
      files: ipfsFiles,
      founder: projectFounder,
      ethAddress: walletAddress,
      duration: numberOfDays,
    }
    const metadataFile = new Moralis.File('metadata.json', {
      base64: btoa(JSON.stringify(metadata)),
    })
    await metadataFile.saveIPFS()
    const metadataURI = metadataFile.ipfs()
    setPDFDone(false)

    const Proposal = new Moralis.Object.extend('Proposal')
    const proposal = new Proposal()

    proposal.set('projectTitle', projectTitle)
    proposal.set('description', description)
    proposal.set('projectPicture', ipfsCover)
    proposal.set('fundingGoal', parseFloat(fundingGoal))
    proposal.set('projectPDF', ipfsFiles)
    proposal.set('projectFounder', projectFounder)
    proposal.set('walletAddress', walletAddress)
    proposal.set('numberOfDays', numberOfDays)
    proposal.save().then((object) => {
      contractCall(object)
      // console.log(object)
      setUploadDone(true)
    })
  }

  return (
    <div className="flex w-full flex-col items-center text-black">
      <div className="flex w-4/12 flex-col items-center justify-center border-r border-b shadow-xl">
        <div className="mx-2 mt-2 w-11/12 items-center border-b border-blue-600 py-2 text-center text-lg font-bold text-gray-800 ">
          Mint Proposal
        </div>
        <div className="mt-4 mb-4 flex w-full flex-col items-center justify-center space-y-4">
          <div className=" flex w-11/12 flex-row justify-evenly">
            <div className="mt-4 mb-4 flex w-full flex-col items-center justify-center space-y-4">
              <div className="z-50 flex w-9/12 max-w-2xl flex-col rounded-xl border-2 border-blue-300/50 bg-transparent px-4 py-1 opacity-95 shadow-xl hover:border-blue-800">
                <input
                  name="projectTitle"
                  id="projectTitle"
                  type="text"
                  placeholder="Project Title"
                  className="outline:none bg-transparent text-center  focus:outline-none"
                />
              </div>
              <div className="z-50 flex w-9/12 max-w-2xl flex-col rounded-xl border-2 border-blue-300/50 bg-transparent px-4 py-1 opacity-95 shadow-xl hover:border-blue-800">
                <input
                  name="projectFounder"
                  id="projectFounder"
                  type="text"
                  placeholder="Project Founder"
                  className="outline:none bg-transparent text-center  focus:outline-none"
                />
              </div>
              <div className="z-50 flex w-9/12 max-w-2xl flex-col rounded-xl border-2 border-blue-300/50 bg-transparent px-4 py-1 opacity-95 shadow-xl hover:border-blue-800 ">
                <textarea
                  name="description"
                  id="description"
                  type="textarea"
                  placeholder="Description"
                  className="outline:none bg-transparent text-center focus:outline-none"
                />
              </div>
              <div className="z-50 flex w-9/12 max-w-2xl flex-col rounded-xl border-2 border-blue-300/50 bg-transparent px-4 py-1 opacity-95 shadow-xl hover:border-blue-800 ">
                <input
                  name="fundingGoal"
                  id="fundingGoal"
                  type="text"
                  placeholder="Total Vote Goal"
                  className="outline:none bg-transparent text-center focus:outline-none"
                />
              </div>
              <div className="z-50 flex w-9/12 max-w-2xl flex-col rounded-xl border-2 border-blue-300/50 bg-transparent px-4 py-1 opacity-95 shadow-xl hover:border-blue-800 ">
                <input
                  name="numberOfDays"
                  id="numberOfDays"
                  type="number"
                  placeholder="Duration in Days"
                  className="outline:none bg-transparent text-center focus:outline-none"
                />
              </div>
              <div className="mt-4"></div>
              <p>Project Picture</p>
              <div className="z-50 flex w-9/12 max-w-2xl flex-col rounded-xl border-2 border-blue-300/50 bg-transparent px-4 py-1 opacity-95 shadow-xl hover:border-blue-800">
                <input
                  type="file"
                  name="projectPicture"
                  id="projectPicture"
                  placeholder="Cover Art"
                  className="outline:none bg-transparent text-center focus:outline-none"
                />
              </div>
              <p>Project PDF</p>
              <div className="z-50 flex w-9/12 max-w-2xl flex-col rounded-xl border-2 border-blue-300/50 bg-transparent px-4 py-1 opacity-95 shadow-xl hover:border-blue-800">
                <input
                  type="file"
                  name="projectPDF"
                  id="projectPDF"
                  placeholder="Cover Art"
                  className="outline:none bg-transparent text-center focus:outline-none"
                />
              </div>
            </div>
          </div>
          <div className="flex w-11/12 flex-col border-b border-blue-600 py-1"></div>
          <div className="flex w-full flex-col items-center justify-center space-y-4 text-white">
            <div className="mx-4 rounded-xl border-b-2 border-black bg-blue-300 p-2 px-4 text-sm text-black">
              <button onClick={createProposal}>Create Proposal</button>
            </div>
            {isUploading && <UploadStarted />}
            {pictureDone && <PictureDone />}
            {pdfDone && <PDFDone />}
            {uploadDone && <UploadConfirmed />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MintProposal
