import {
  ArrowSmDownIcon,
  ArrowSmUpIcon,
  CheckCircleIcon,
  CheckIcon,
  DownloadIcon,
  HeartIcon,
} from '@heroicons/react/outline'
import Image from 'next/image'
import { useState } from 'react'

function CardProjects(props) {
  function viewDocuments() {
    // execute viewing
    alert('successfully viewed')
  }
  return (
    <div className="mb-8 flex h-56 w-6/12 flex-col items-center justify-center border-b border-r border-white shadow-xl">
      <div className="flex flex-row justify-between space-x-8">
        <div className="relative ml-6 flex w-6/12 flex-col items-center">
          <h1 className=" my-2">{props.data.get('projectTitle')}</h1>
          <Image
            src="/constdao.jpeg"
            width={100}
            height={100}
            className="rounded-xl"
          />
          <p className="mt-2 text-sm font-thin">{props.data.get('userId')}</p>
        </div>
        <div className="flex flex-col items-start justify-center space-y-4">
          <h3 className="text-sm">Description</h3>
          <p className="mr-4 flex flex-wrap text-sm font-light">
            {props.data.get('description')}
          </p>
          <div className="flex flex-row items-center justify-around space-x-16 text-sm">
            <div className="rounded-xl border-b-2 border-black bg-blue-200 p-2 text-sm text-black hover:cursor-pointer active:border-blue-600 active:bg-blue-200">
              <div
                className="flex flex-row items-center space-x-2 text-xs "
                onClick={viewDocuments}
              >
                <p>Documents</p>
                <DownloadIcon className="h-3 w-3" />
              </div>
            </div>
            <p className="flex flex-row">
              Goal: {props.data.get('fundingGoal')} Votes{' '}
              <ArrowSmUpIcon className="h-3 w-3 text-green-500" />
            </p>
          </div>
        </div>
      </div>
      <div className="flex w-11/12 flex-row-reverse items-end justify-items-center">
        <div className="flex flex-row-reverse items-center justify-center">
          <div className="mx-4 flex flex-row space-x-4 rounded-xl bg-blue-200 p-1 px-4 text-sm text-black ">
            <p>Voted</p>
            <CheckCircleIcon className="h-5 w-5" />
          </div>
          <div className="flex-end flex flex-row space-x-8 pr-32 text-sm">
            <p className="flex flex-row">
              {props.data.get('voteUp')} Votes{' '}
              <ArrowSmUpIcon className="h-3 w-3 text-green-500" />
            </p>
            <p className="flex flex-row">
              {props.data.get('voteDown')} Votes{' '}
              <ArrowSmDownIcon className="h-3 w-3 text-red-500" />
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardProjects
