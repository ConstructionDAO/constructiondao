import { CreditCardIcon } from '@heroicons/react/outline'
import { useMoralis } from 'react-moralis'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
// import Chains from "../Chains/Chains";
import Image from 'next/image'
import CDAOBalance from './MoralisComponents/CDAOBalance'

export default function Header() {
  const router = useRouter()

  const { isAuthenticated, authenticate, logout, user } = useMoralis()

  const [userProfile, setUserProfile] = useState()
  const [wallet, setWallet] = useState()

  function userLogout() {
    logout()
    router.push(`/`)
  }
  function getDAOs() {
    if (!isAuthenticated) {
      alert('you have to login first')
    } else {
      router.push('/votes')
    }
  }

  return (
    <div className="sticky top-0 flex h-24 w-full items-center justify-between overflow-hidden border-b-2 border-blue-300 bg-gradient-to-b from-gray-900/5 to-blue-300 px-5 shadow-lg">
      <Image
        width={150}
        height={50}
        src="/cdao-logo-1.svg"
        className="flex items-center justify-center"
      />
      <div className="flex flex-row items-center justify-between space-x-2">
        <div className="flex flex-col items-center pr-8 text-sm font-bold italic  text-gray-700">
          <button
            onClick={getDAOs}
            className="border-b border-black text-sm italic"
          >
            Get CDAO
          </button>
          <p>CDAO Balance</p>
          <CDAOBalance />
        </div>
        <button
          className="flex flex-row items-center rounded-xl border-b-2 border-black
          bg-blue-300 py-2
          px-6 text-sm text-blue-800
          hover:shadow-xl active:border-b-2 active:border-blue-300 active:bg-blue-700 active:text-white"
          onClick={!isAuthenticated ? authenticate : userLogout}
        >
          {isAuthenticated ? 'Disconnect' : 'Connect Wallet'}
        </button>
      </div>
    </div>
  )
}
