import React from 'react'
import BigNumber from 'bignumber.js/bignumber'
import { Heading,Text ,Card, CardBody, Button } from '@macist-m/robinia-uikit'
import { getBalanceNumber } from 'utils/formatBalance'
import { useTotalSupply, useBurnedBalance } from 'hooks/useTokenBalance'
import { BLOCKS_PER_YEAR} from 'config'
import { getCakeAddress } from 'utils/addressHelpers'
import { QuoteToken } from 'config/constants/types'
import styled from 'styled-components'
import { useFarms, usePriceCakeBusd, useTotalValue ,usePriceBnbBusd} from '../../../state/hooks'

const StakeEarn = () => {
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
    <div className="rbs-card h-full relative" style={{ maxHeight: 300,minWidth:240 , maxWidth:304 }}>
        <div className="text-center text-white text-2xl tracking-wide leading-6 font-bold">
    Stake LP tokens in Farms and 
    <br/>
    Earn Up To:
    </div>
    <div className="ml-14  earn-bg tracking-wide p-6 rounded-2xl shadow-sm w-full">
      <div className="mt-2 text-secondary  text-3xl font-bold">
      {new Intl.NumberFormat().format(topAPY)} % APR
      </div>
    
    </div>
    
  </div>
  
  )
}
  export default StakeEarn
  