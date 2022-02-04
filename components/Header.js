import { CreditCardIcon } from '@heroicons/react/outline'
import { useMoralis } from 'react-moralis'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
// import Chains from "../Chains/Chains";
import Image from 'next/image'

export default function Header() {
  const router = useRouter()

  const { isAuthenticated, authenticate, logout, user } = useMoralis()

  const [userProfile, setUserProfile] = useState()
  const [wallet, setWallet] = useState()

  function userLogout() {
    logout()
    router.push(`/`)
  }

  return (
    <div className="sticky top-0  flex h-24 items-center justify-between border-b-2 border-blue-300 bg-gradient-to-b from-gray-900/5 to-blue-300 px-10 shadow-lg">
      <Image width={100} height={100} src="/cdao1.png" className="" />
      <div className="flex flex-row items-center justify-between space-x-2">
        <div className="flex pr-8 text-sm font-bold italic  text-gray-700">
          Available CDAOs: {user.get('username')}
        </div>
        <button
          className="flex flex-row items-center rounded-xl border-b-2 border-black
          bg-blue-300 py-2
          px-6 text-sm text-blue-800
          hover:shadow-xl active:border-b-2 active:border-blue-300 active:bg-blue-700 active:text-white"
          onClick={!isAuthenticated ? authenticate : userLogout}
        >
          {isAuthenticated
            ? 'Disconnect ' + `${user.get('username')}`
            : 'Connect Wallet'}
        </button>
      </div>
      {/* <Image
        width={100}
        height={100}
        src="/daoCone.png"
        className="rotate-45"
      /> */}
    </div>
  )
}
