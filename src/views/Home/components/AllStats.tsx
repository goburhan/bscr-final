import React from 'react'
import { Text } from '@macist-m/robinia-uikit'
import BigNumber from 'bignumber.js/bignumber'
import { getBalanceNumber } from 'utils/formatBalance'
import { useTotalSupply, useBurnedBalance } from 'hooks/useTokenBalance'
import { BLOCKS_PER_YEAR} from 'config'
import { getCakeAddress } from 'utils/addressHelpers'
import { QuoteToken } from 'config/constants/types'
import CardValue from './CardValue'
import { useFarms, usePriceCakeBusd, useTotalValue ,usePriceBnbBusd} from '../../../state/hooks'


const AllStats = () => {
  const totalValue = useTotalValue()
  const totalSupply = useTotalSupply()
  const burnedBalance = useBurnedBalance(getCakeAddress())
  const farms = useFarms()
  const eggPrice = usePriceCakeBusd()
  const bnbPrice = usePriceBnbBusd()
  const circSupply = totalSupply ? totalSupply.minus(burnedBalance) : new BigNumber(0)
  const cakeSupply = getBalanceNumber(circSupply)
  const marketCap = eggPrice.times(circSupply)
  let eggPerBlock = 0
  if (farms && farms[0] && farms[0].eggPerBlock) {
    eggPerBlock = new BigNumber(farms[0].eggPerBlock)
      .div(new BigNumber(10).pow(18))
      .toNumber()
  }
  const x =[]
   farms.map((farm) => {
    // if (!farm.tokenAmount || !farm.lpTotalInQuoteToken || !farm.lpTotalInQuoteToken) {
    //   return farm
    // }
    const cakeRewardPerBlock = new BigNumber(farm.eggPerBlock || 1)
      .times(new BigNumber(farm.poolWeight))
      .div(new BigNumber(10).pow(18))
    const cakeRewardPerYear = cakeRewardPerBlock.times(BLOCKS_PER_YEAR)

    let apy = eggPrice.times(cakeRewardPerYear)

    let totalValuex = new BigNumber(farm.lpTotalInQuoteToken || 0)

    if (farm.quoteTokenSymbol === QuoteToken.BNB) {
      totalValuex = totalValuex.times(bnbPrice)
    }

    if (totalValuex.comparedTo(0) > 0) {
      apy = apy.div(totalValuex)
    }

    x.push(apy)
    return null
  })
  const topAPY = x.reduce(function (accumulatedValue, currentValue) {
    return Math.max(accumulatedValue, currentValue);
  });


  return (

    <div className="rbs-card h-full relative" style={{minWidth:200 ,maxWidth:500 }}>
       
       
       <div className="grid grid-cols-2 gap-40">
       <div className="text-white">USD Market Cap</div>
       <CardValue
            fontSize="18px"
            value={getBalanceNumber(marketCap)}
            decimals={0}
            prefix="$"
          />
        </div>

        <div className="grid grid-cols-2 gap-18">
            <div className="text-white">SCORUM IN CIRCULATION</div>
         <div className="ml-20">
            {cakeSupply && <CardValue fontSize="18px" value={cakeSupply} decimals={0} />}
         </div>
        </div>

        <div className="grid grid-cols-2 gap-18">
            <div className="text-white">GNANA IN CIRCULATION</div>
         <div className="ml-20">
            {cakeSupply && <CardValue fontSize="18px" value={cakeSupply} decimals={0} />}
         </div>
        </div>

        <div className="grid grid-cols-2 gap-20">
        <div className="text-white">YIELD NYAN BURNED</div>
        <div className="ml-10">
         <CardValue
            fontSize="18px"
            value={getBalanceNumber(burnedBalance)}
            decimals={0}
          />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-40">
        <div className="text-white">DEX LIQUIDITY</div>
        {totalSupply && (
            <CardValue
              fontSize="18px"
              value={getBalanceNumber(totalSupply)}
              decimals={0}
            />
          )}
        </div>

        <div className="grid grid-cols-2 gap-20">
        <div className="text-white">Robinia Per Block</div>
        <div className="ml-10">
          <Text bold fontSize="18px" color="primary">
            {eggPerBlock}
          </Text>
        </div>
        </div>
      
    </div>
  )
}
  export default AllStats