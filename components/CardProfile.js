import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useMoralis } from 'react-moralis'
import NativeBalance from './MoralisComponents/NativeBalance'
import Modal from './Profile/Modal'
import ERC20Balances from '../hooks/useERC20Balances'
import { XIcon } from '@heroicons/react/outline'
import MintVote from './MintVote'

function CardProfile() {
  const { user, isAuthenticated, isWeb3Enabled } = useMoralis()

  const [editModal, setEditModal] = useState(false)
  const [username, setUsername] = useState()
  const [walletAddress, setWalletAddress] = useState()
  const [userEmail, setUserEmail] = useState()
  const [userLink, setUserLink] = useState()
  const [userAvatar, setUserAvatar] = useState()
  const [userFile, setUserFile] = useState()
  const [showAddress, setShowAddress] = useState(true)

  useEffect(() => {
    if (user) {
      setUsername(user.get('username'))
      setWalletAddress(user.get('ethAddress'))
      setUserEmail(user.get('email'))
      setUserLink(user.get('url'))
      setUserAvatar(user.get('avatar'))
      setUserFile(user.get('file'))
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
  return (
    <div className="flex w-full flex-col justify-evenly ">
      <div className="flex w-full flex-row justify-evenly ">
        <div className="flex w-4/12 flex-col items-center justify-center rounded-xl border-r border-b-2 border-white shadow-xl">
          <h1 className="my-4">{username}</h1>
          <Image
            src="/constdao.jpeg"
            // src={userAvatar}
            width={125}
            height={125}
            className="rounded-full"
          />
          <div className="mt-4 flex flex-col space-x-4">
            {showAddress && <p className="text-sm">{walletAddress}</p>}
            {showAddress && (
              <button className="text-xs text-gray-600" onClick={hideAddress}>
                hide address
              </button>
            )}
            {!showAddress && (
              <button className="text-xs text-gray-600" onClick={unHideAddress}>
                show address
              </button>
            )}
          </div>
          {userEmail && <p>{userEmail}</p>}
          {userLink && <p>{userLink}</p>}

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
        <div className="flex w-4/12 flex-col items-center rounded-xl border-r border-b-2 border-white shadow-xl">
          <h1 className="my-4 ">Wallet Balance</h1>
          <NativeBalance />
          <ERC20Balances />
        </div>
      </div>
    </div>
  )
}

export default CardProfile
