import { useMoralis } from 'react-moralis'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Header from './Header'
import { GlobeAltIcon } from '@heroicons/react/solid'

function Login() {
  const router = useRouter()
  const { authenticate } = useMoralis()

  return (
    <div className="h-screen bg-gradient-to-b from-white via-white  to-blue-300">
      {/* <Header /> */}
      <Header />

      <div className="mb-4 flex flex-col items-center">
        <div className="mt-24 mb-4 flex flex-row items-center justify-between border-b-2 border-white">
          <div className="mb-4 flex">
            <h1 className="text-5xl text-white">CONSTRUCT DAO</h1>
          </div>
        </div>
        {/* <Image
          width={350}
          height={350}
          src="/constructiondao.jpg"
          alt="Item"
          className="rounded-xl"
        /> */}
        {/* <GlobeAltIcon className="h-10 w-10" /> */}
        <div
          className="my-12 justify-center rounded-xl border-b-2 border-black bg-blue-300 py-3 px-4 
                            text-sm text-black 
                            hover:shadow-xl active:border-b-2 active:border-blue-700 active:bg-blue-500 "
        >
          <button onClick={authenticate}>Explore Dao</button>
        </div>

        {/* <About /> */}
      </div>
    </div>
  )
}

export default Login
