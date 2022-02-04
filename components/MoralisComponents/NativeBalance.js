import { useMoralis, useNativeBalance } from 'react-moralis'
import Image from 'next/image'

function NativeBalance(props) {
  const { data: balance } = useNativeBalance(props)
  const { account, isAuthenticated } = useMoralis()

  if (!account || !isAuthenticated) return null

  return (
    <div className="z-50 flex w-56 max-w-2xl flex-row items-center justify-center space-x-2 rounded-xl border-2 border-blue-300/50 bg-transparent opacity-95 shadow-xl hover:border-blue-800">
      <Image
        height={20}
        width={20}
        className="rounded-full pl-2 pr-2"
        src="https://polygonscan.com/images/svg/brands/polygon.svg"
      />
      <div className="items-center justify-between space-x-2">
        {balance.formatted}
      </div>
    </div>
  )
}

export default NativeBalance
