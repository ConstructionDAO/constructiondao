import { useMoralis } from 'react-moralis'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Header from './Header'
import Head from 'next/head'
import { GlobeAltIcon } from '@heroicons/react/solid'

function Login() {
  const router = useRouter()
  const { authenticate } = useMoralis()

  return (
    <div className="z-50 bg-gradient-to-b from-white  via-white to-blue-300">
      <Head>
        <title>Construction DAO - Login</title>
        <link rel="icon" href="/cdao-fin.svg" />
      </Head>
      <div className="absoluet top-0">
        <Header />
      </div>
      <div className="z-50 flex flex-col">
        <Image
          src="/landingBG.png"
          height={700}
          width={1500}
          objectFit="cover"
          className="z-20"
        />
        <div className=" flex flex-col items-center">
          <div
            className="mt-4 mb-2 justify-center rounded-xl border-b-2 border-black bg-blue-300 py-3 px-4 
          text-sm text-black 
          hover:shadow-xl active:border-b-2 active:border-blue-700 active:bg-blue-500 "
          >
            <button onClick={authenticate}>Explore Dao</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
