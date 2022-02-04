import { DownloadIcon } from '@heroicons/react/outline'
import { HeartIcon } from '@heroicons/react/solid'
import Image from 'next/image'
import { useState } from 'react'

function CardProjects() {
  const [isLiked, setIsLiked] = useState(false)

  function voteProject() {
    // execute voting function
    alert('successfully voted')
  }

  function viewDocuments() {
    // execute viewing
    alert('successfully viewed')
    // window.open('insertlink')
  }

  function like() {
    setIsLiked(true)
  }
  function dislike() {
    setIsLiked(false)
  }

  return (
    <div className="mb-8 flex h-56 w-6/12 flex-col items-center justify-center  border-b border-r border-white shadow-xl">
      <div className="flex flex-row justify-between space-x-8">
        <div className="relative ml-6 flex w-6/12 flex-col items-center">
          <h1 className=" my-2">Project Title</h1>
          <Image
            src="/constdao.jpeg"
            width={100}
            height={100}
            className="rounded-xl"
          />
          <p className="mt-2 text-sm font-thin">Initiator Profile</p>
        </div>
        <div className="flex flex-col items-start justify-center space-y-4">
          <h3 className="text-sm">Description</h3>
          <p className="mr-4 flex flex-wrap text-sm font-light">
            We are raising funds to help build infrastructure for communities in
            need. Our goal is to raise 1000 Votes. need. Our goal is to raise
            1000 Votes. need. Our goal is to raise 1000 Votes. need. Our goal is
          </p>
          <div className="flex flex-row items-center justify-around space-x-16 text-sm">
            <div className="rounded-xl border-b-2 border-black bg-blue-200 p-2 text-sm text-black active:border-t active:border-blue-600 active:bg-blue-200">
              <div
                className="flex flex-row items-center space-x-2 text-xs hover:cursor-pointer"
                onClick={viewDocuments}
              >
                <p>Documents</p>
                <DownloadIcon className="h-3 w-3" />
              </div>
            </div>
            <p>0/1000 Votes</p>
          </div>
        </div>
      </div>
      <div className="flex w-11/12 flex-row-reverse items-end justify-items-center">
        <div className="flex flex-row-reverse items-center justify-center">
          <div className="mx-4 rounded-xl border-b-2 border-black bg-blue-300 p-1 px-4 text-sm text-black active:border-t active:border-blue-600 active:bg-blue-200">
            <button onClick={voteProject}>Vote</button>
          </div>
          {!isLiked ? (
            <div onClick={like}>
              <HeartIcon className="h-5 w-5 text-gray-600" />
            </div>
          ) : (
            <div onClick={dislike}>
              <HeartIcon className="h-5 w-5 text-red-600" />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CardProjects
