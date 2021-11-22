import React from 'react'
import { usePriceCakeBusd, useTotalValue } from 'state/hooks'
import { useTotalSupply} from 'hooks/useTokenBalance'
import CardValue from 'views/Home/components/CardValue'
import { getBalanceNumber } from 'utils/formatBalance'
import Socials from './Socials'

declare global {
  interface Window {
      ethereum:any;
  }
}
const addToMetamask =  function (){
       window.ethereum
   .request({
     method: 'wallet_watchAsset',
     params: {
       type: 'ERC20',
       options: {
         address: '0xAfAEEe58a58867c73245397C0F768FF041D32d70',
         symbol: 'RBS',
         decimals: 18,
         image: 'https://robiniaswap.com/images/favicons/apple-icon-72x72.png',
       },
     },
   })
   .then((success) => {
     if (success) {
       console.log('RBS successfully added to wallet!')
     } else {
       throw new Error('Something went wrong.')
     }
   })
   .catch(console.error)
}
const MainFooter = () => {
  const cakePriceUsd = usePriceCakeBusd()
  const totalValue = useTotalValue()
  const totalSupply = useTotalSupply()
  return (
    <div>
      <div className="rbs-card">
        <div className="py-3">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {/* Price Block */}
            <div className="flex flex-row justify-center md:justify-center lg:justify-start">
              <div className="w-18 mr-2">
                <img src="/images/bscr.png" alt="rbs-ico"  />
              </div>
              <div className="flex flex-col items-start justify-center">
                <div className="text-gray-400 mb-1">BSCR Price</div>
                <div className="font-bold text-md text-white">
                  ${cakePriceUsd.toNumber().toFixed(3)}
                </div>
              </div>
            </div>
            {/* Metamask Link */}
            <div className="flex flex-row justify-center items-center">
              <div className="mr-2">
                <img src="/images/metamask-ico.svg" alt="rbs-ico" width="35px" />
              </div>
              <button type="button" onClick={addToMetamask} className="flex flex-col items-start justify-center">
                <div className="font-bold text-md text-purple-600">
                  Add RBS to Metamask
                </div>
              </button>
            </div>
            {/* BCN Pricing */}
            <div className="flex flex-row justify-center">
              <div className="flex flex-col items-start justify-center">
                <div className="flex w-52 justify-between">
                  <div className="font-bold text-md text-gray-400 mr-2">BSCR Price</div>
                  <div className="text-right text-gray-400">Total BSCR </div>
                </div>
                <div className="flex w-52 justify-between">
                  <div className="font-bold text-md text-white mr-20"> ${cakePriceUsd.toNumber().toFixed(3)}</div>
                  <div className="font-bold text-md text-white mr-20">{getBalanceNumber(totalSupply)}</div>
                </div>
              </div>
            </div>
            {/* TVL */}

            <div className="flex flex-col items-center md:items-center lg:items-end">
              <div className="font-bold text-md text-gray-400">
                Total Value Locked (TVL)
              </div>
              <div>
                {(totalValue.toNumber() > 0) ?
                    <CardValue
                    value={totalValue.toNumber()}
                    prefix="$"
                    decimals={2}
                    fontSize="18px"
                  />
                :
                <CardValue
                value={0}
                prefix="$"
                decimals={2}
                fontSize="18px"
              />
              }

              </div>
            </div>
          </div>
        </div>
      </div>
    
    </div>
  )
}

export default MainFooter
