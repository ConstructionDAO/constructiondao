import {
  ArrowSmDownIcon,
  ArrowSmUpIcon,
  CheckCircleIcon,
  CheckIcon,
  DownloadIcon,
  HeartIcon,
} from '@heroicons/react/outline'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import NumberFormat from 'react-number-format'
import { format, parseISO } from 'date-fns'
import { useMoralis } from 'react-moralis'

function CardVoted(props) {
  const { isAuthenticated, user, isWeb3Enabled, Moralis } = useMoralis()
  const [isOwner, setIsOwner] = useState(false)
  const [isDisabled, setIsDisabled] = useState(
    props.data.vote == undefined ? false : true
  )

  useEffect(() => {
    if (props.data.walletAddress == user.get('ethAddress')) {
      setIsOwner(true)
    }
    if (props.data.vote ? true : false) {
      setIsDisabled(true)
    }
    console.log(props.data.createdAt)
    console.log(props.data)
  }, [user])

  async function contractCall(vote) {
    const web3Provider = await Moralis.enableWeb3()
    const ethers = Moralis.web3Library

    const contractProposal = new ethers.Contract(
      ConstructionAddress,
      ConstructionABI,
      web3Provider.getSigner()
    )
    contractProposal
      .voteOnProposal(props.data.objectId, vote)
      .then((result) => {
        alert('voted successfully')
        console.log(result)
      })
  }

  function getStatus(status) {
    if (status == 1) {
      return 'Active'
    } else if (status == 2) {
      return 'Cancelled'
    } else if (status == 3) {
      return 'Accepted'
    } else if (status == 4) {
      return 'Rejected'
    } else if (status == 5) {
      return 'Funded'
    } else if (status == 6) {
      return 'Completed'
    }
  }

  function voteUp() {
    if (props.data.vote ? true : false) {
      setIsDisabled(true)
    } else {
      contractCall(true)
    }
  }
  function voteDown() {
    if (props.data.vote ? true : false) {
      setIsDisabled(true)
    } else {
      contractCall(false)
    }
  }

  function viewDocuments() {
    window.open(props.data.projectPDF)
  }

  async function contractCancel() {
    const web3Provider = await Moralis.enableWeb3()
    const ethers = Moralis.web3Library

    const contractCancelled = new ethers.Contract(
      ConstructionAddress,
      ConstructionABI,
      web3Provider.getSigner()
    )
    contractCancelled.cancelProposal(props.data.objectId).then((result) => {
      alert('successfully cancelled')
    })
  }
  return (
    <div className="mb-8 flex h-56 w-9/12 flex-col items-center justify-center  border-b border-r border-white shadow-xl">
      <div className="flex w-full flex-row space-x-8">
        <div className="flex-start flex w-3/12 flex-col items-center">
          <h1 className=" my-2">{props.data.projectTitle}</h1>
          <Image
            src={props.data.projectPicture || '/cdao-fin.svg'}
            width={100}
            height={100}
            className="rounded-xl"
          />
          <p className="mt-2 text-sm font-thin">{props.data.projectFounder}</p>
          <div className="mt-4 flex flex-row text-sm">
            <p className="flex flex-row">
              {props.data.voteUp} Votes{' '}
              <ArrowSmUpIcon className="h-3 w-3 text-green-500" />
            </p>

            <p className="flex flex-row">
              {props.data.voteDown} Votes{' '}
              <ArrowSmDownIcon className="h-3 w-3 text-red-500" />
            </p>
          </div>
        </div>
        <div className="mt-8 flex w-9/12 flex-col space-y-2">
          <div className="flex flex-row items-center justify-between">
            <h3 className="text-sm">Description</h3>
            <div className="flex flex-row pr-4 text-xs font-light italic">
              Created: &nbsp;
              <p className="italic">
                {format(new Date(props.data.createdAt), 'iii do MMM yyyy p')}
                {/* {format(parseISO(props.data.createdAt), 'iii do MMM yyyy p')} */}
              </p>
            </div>
          </div>
          <p className="mr-4 flex flex-wrap text-sm font-light">
            {props.data.description}
          </p>

          <div className="mr-4 flex flex-row items-center justify-around space-x-4 border-b pt-4 text-sm">
            <div className="flex flex-row">
              Goal: &nbsp;
              <NumberFormat
                value={props.data.fundingGoal}
                displayType={'text'}
                thousandSeparator={true}
                prefix={'CDAOs '}
              />
              {/* <ArrowSmUpIcon className="h-3 w-3 text-green-500" /> */}
            </div>
            <p className="flex flex-row">
              Duration: {props.data.numberOfDays / 86400} Days
            </p>

            <p className="flex flex-row">
              Status: {''}
              {getStatus(props.data.status)}
            </p>
          </div>
          <div className="flex flex-row items-center justify-center space-x-4 pb-4 pt-4">
            <div className="rounded-xl border-b-2 border-black bg-blue-200 p-2 text-sm text-black active:border-blue-600 active:bg-blue-200">
              <div
                className="flex flex-row items-center space-x-2 text-xs hover:cursor-pointer"
                onClick={viewDocuments}
              >
                <p>Documents</p>
                <DownloadIcon className="h-3 w-3" />
              </div>
            </div>
            {!isDisabled ? (
              <div className="flex flex-row">
                <div className="mx-4 rounded-xl border-b-2 border-black bg-blue-300 p-1 px-2 text-sm text-black active:border-blue-600 active:bg-blue-200">
                  <button onClick={voteUp}>Vote Up</button>
                </div>
                <div className="mx-4 rounded-xl border-b-2 border-black bg-blue-300 p-1 px-2 text-sm text-black active:border-blue-600 active:bg-blue-200">
                  <button onClick={voteDown}>Vote Down</button>
                </div>
              </div>
            ) : (
              <div className="flex flex-row">
                <div className="mx-4 flex flex-row space-x-4 rounded-xl bg-gray-200 p-1 px-4 text-sm text-black ">
                  <p>Voted</p>
                  <CheckCircleIcon className="h-5 w-5" />
                </div>
              </div>
            )}
            {isOwner && props.data.status == 1 && (
              <div className="mx-4 rounded-xl border-b-2 border-black bg-blue-300 p-1 px-2 text-sm text-black active:border-blue-600 active:bg-blue-200">
                <button onClick={contractCancel}>Cancel</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardVoted
