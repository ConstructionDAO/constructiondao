import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useMoralis } from 'react-moralis'
import NativeBalance from './MoralisComponents/NativeBalance'
import Modal from './Profile/Modal'
import ERC20Balances from '../hooks/useERC20Balances'
import {
  ClipboardCopyIcon,
  DuplicateIcon,
  EyeIcon,
  EyeOffIcon,
  XIcon,
} from '@heroicons/react/outline'
import MintVote from './MintVote'

function CardProfile() {
  const { user, isAuthenticated, isWeb3Enabled } = useMoralis()

  const [editModal, setEditModal] = useState(false)
  const [username, setUsername] = useState()
  const [walletAddress, setWalletAddress] = useState()
  const [userEmail, setUserEmail] = useState()
  const [userLink, setUserLink] = useState()
  const [userAvatar, setUserAvatar] = useState()
  const [showAddress, setShowAddress] = useState(true)

  useEffect(() => {
    if (user) {
      setUsername(user.get('username'))
      setWalletAddress(user.get('ethAddress'))
      setUserEmail(user.get('email'))
      setUserLink(user.get('url'))
      setUserAvatar(user.get('file'))
    }
    console.log(userAvatar)
  }, [isAuthenticated, user, isWeb3Enabled])

  function editUser() {
    setEditModal(true)
    console.log(userAvatar)
  }
  function hideAddress() {
    setShowAddress(false)
  }
  function unHideAddress() {
    setShowAddress(true)
  }

  function copyAddress() {
    navigator.clipboard.writeText(walletAddress)
  }
  function copyEmail() {
    navigator.clipboard.writeText(userEmail)
  }
  function navigateLink() {
    window.open(props.data.get('projectPDF'))
  }

  return (
    <div className="flex w-full flex-col justify-evenly">
      <div className="flex w-full flex-row justify-evenly ">
        <div className="flex w-4/12 flex-col items-center justify-center border-r border-b border-white shadow-xl">
          <div className="mx-2 mt-2 mb-4 w-11/12 items-center border-b border-blue-600 py-2 text-center text-lg font-bold text-gray-800 ">
            <h1>{username}</h1>
          </div>
          <Image
            // src={userAvatar}
            src="/cdao-fin.svg"
            width={100}
            height={100}
            className="rounded-xl"
          />
          <div className="mt-4 flex flex-col space-x-4">
            {showAddress && (
              <div className="flex flex-row items-center space-x-2 hover:cursor-pointer">
                <p
                  className="text-xs active:text-blue-300"
                  onClick={copyAddress}
                >
                  {walletAddress}
                </p>
                {showAddress && (
                  <EyeOffIcon onClick={hideAddress} className="h-4 w-4" />
                )}
              </div>
            )}
            {!showAddress && (
              <div
                className="flex flex-row items-center hover:cursor-pointer active:text-blue-300"
                onClick={unHideAddress}
              >
                <EyeIcon className="h-4 w-4" />
              </div>
            )}
          </div>
          <div className="mt-4 flex flex-col items-center space-y-2">
            {userEmail && (
              <p
                className="hover:cursor-pointer active:text-blue-300"
                onClick={copyEmail}
              >
                {userEmail}
              </p>
            )}
            {userLink && (
              <p
                className="hover:cursor-pointer active:text-blue-300"
                onClick={navigateLink}
              >
                {userLink}
              </p>
            )}
          </div>

          {!editModal && (
            <button
              className="my-4 rounded-xl bg-blue-100 px-2 text-sm text-blue-800 active:bg-blue-500 active:text-white"
              onClick={editUser}
            >
              Edit Profile
            </button>
          )}
          {editModal && <Modal setEditModal={setEditModal} />}
          {editModal && (
            <button
              className="mb-4 flex w-9 flex-col items-center rounded-full border-b-2 border-black bg-blue-300 
        text-sm text-black hover:shadow-xl active:border-b active:border-blue-300 active:bg-blue-700 active:text-white"
              onClick={() => setEditModal(false)}
            >
              <XIcon className="h-4 w-4" />
            </button>
          )}
        </div>
        <div className="flex w-4/12 flex-col items-center border-r border-b border-white shadow-xl">
          <div className="mx-2 mt-2 mb-4 w-11/12 items-center border-b border-blue-600 py-2 text-center text-lg font-bold text-gray-800 ">
            Wallet Balance
          </div>
          <NativeBalance />
          <ERC20Balances />
        </div>
      </div>
    </div>
  )
}

export default CardProfile
