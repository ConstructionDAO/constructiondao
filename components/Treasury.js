import TreasuryCards from './TreasuryCards'
import Bottom from './Bottom'

function Treasury(props) {
  return (
    <div className="flex h-screen w-full flex-col items-center">
      <h1 className="mt-4 mb-8 text-xl font-extrabold italic text-gray-600">
        Treasury
      </h1>
      <div className="flex w-9/12 flex-col">
        <TreasuryCards
          treasuryValue={props.treasuryValue}
          projectsFunded={props.projectsFunded}
          fundedTotal={props.fundedTotal}
        />
      </div>
    </div>
  )
}

export default Treasury
