import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useMoralis } from 'react-moralis'
import NumberFormat from 'react-number-format'

function TreasuryCards(props) {
  const { user, isAuthenticated, isWeb3Enabled } = useMoralis()

  useEffect(() => {
    console.log(props.treasuryValue)
  }, [isAuthenticated, user, isWeb3Enabled])

  return (
    <div className="flex w-full flex-col justify-evenly text-gray-600">
      <div className="flex w-full flex-row justify-center space-x-8 ">
        <div className="flex w-4/12 flex-col items-center justify-center border-r border-b border-white shadow-xl">
          <div className="mx-2 mt-2 mb-4 w-11/12 items-center border-b border-blue-600 py-2 text-center text-lg font-bold text-gray-800 ">
            Treasury Value
          </div>
          <div className="my-16 text-3xl font-bold">
            <NumberFormat
              value={props.treasuryValue}
              displayType={'text'}
              thousandSeparator={true}
              prefix={'$ '}
            />{' '}
          </div>
        </div>
        <div className="flex w-4/12 flex-col items-center border-r border-b border-white shadow-xl">
          <div className="mx-2 mt-2 mb-4 w-11/12 items-center border-b border-blue-600 py-2 text-center text-lg font-bold text-gray-800 ">
            Projects Funded
          </div>
          <div className="my-16 text-3xl font-bold">
            <NumberFormat
              value={props.projectsFunded}
              displayType={'text'}
              thousandSeparator={true}
            />{' '}
          </div>
        </div>
        <div className="flex w-4/12 flex-col items-center border-r border-b border-white shadow-xl">
          <div className="mx-2 mt-2 mb-4 w-11/12 items-center border-b border-blue-600 py-2 text-center text-lg font-bold text-gray-800 ">
            Total Value Funded
          </div>
          <div className="my-16 text-3xl font-bold">
            <NumberFormat
              value={props.fundedTotal}
              displayType={'text'}
              thousandSeparator={true}
            />{' '}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TreasuryCards
