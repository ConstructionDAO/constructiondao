import { useERC20Balances } from 'react-moralis'
import { useMoralis } from 'react-moralis'

const ERC20Balances = (props) => {
  const { fetchERC20Balances, data, isLoading, isFetching, error } =
    useERC20Balances()
  const { Moralis } = useMoralis()

  return (
    <div>
      {error && <>{JSON.stringify(error)}</>}
      {/* <h1 className="flex flex-col items-center">Token Balances</h1> */}
      {data
        ? data.map((element, index) => (
            <div
              key={index}
              className="z-50 mt-4 flex w-56 max-w-2xl flex-row items-center justify-center space-x-2 rounded-xl border-2 border-blue-300/50 bg-transparent opacity-95 shadow-xl hover:border-blue-800"
            >
              <img
                src={'https://polygonscan.com/images/svg/brands/polygon.svg'}
                // || "https://snowtrace.io/images//empty-token.png" }
                alt="nologo"
                width="20px"
                height="20px"
                className="rounded-full"
              />
              <span>
                {parseFloat(
                  Moralis?.Units?.FromWei(element.balance, element.decimals)
                ).toFixed(5)}
              </span>
              <span>{element.symbol}</span>
            </div>
          ))
        : ''}
    </div>
  )
}

export default ERC20Balances
