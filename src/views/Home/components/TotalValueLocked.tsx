import React from 'react'
import BigNumber from 'bignumber.js/bignumber'
import { Heading,Text ,Card, CardBody,Skeleton ,Button } from '@macist-m/robinia-uikit'
import { getBalanceNumber } from 'utils/formatBalance'
import { useTotalSupply, useBurnedBalance } from 'hooks/useTokenBalance'
import { BLOCKS_PER_YEAR} from 'config'
import { getCakeAddress } from 'utils/addressHelpers'
import { QuoteToken } from 'config/constants/types'
import styled from 'styled-components'
import useI18n from 'hooks/useI18n'
import { useGetStats } from 'hooks/api'
import { useTotalValue } from '../../../state/hooks'
import CardValue from './CardValue'



const StakeEarn = () => {
    const TranslateString = useI18n()
  // const data = useGetStats()
  const totalValue = useTotalValue()
    
   
  return (
    <div className="rbs-card h-full relative flex flex-col justify-center max-w-md  md:max-w-xl" style={{ maxHeight: 300,maxWidth:304 }}>
        <div className="text-center  text-white text-2xl tracking-wide leading-6 font-bold p-2">
    Total Value Locked (TVL)
    </div>
    <div className="text-sm text-gray-500 font-bold earn-bg tracking-wide p-4">
    <CardValue fontSize="24px" value={totalValue.toNumber()} prefix="$" decimals={2} />
        Across all LPs and Pools Locked
    </div>
    
  </div>
  )
}
  export default StakeEarn
  