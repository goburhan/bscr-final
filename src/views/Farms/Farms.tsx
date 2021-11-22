import React, { useEffect, useCallback, useState } from 'react'
import { Route, useRouteMatch } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import BigNumber from 'bignumber.js'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { provider } from 'web3-core'
import { Image, Heading } from '@macist-m/robinia-uikit'
import { BLOCKS_PER_YEAR, CAKE_PER_BLOCK, CAKE_POOL_PID } from 'config'
import FlexLayout from 'components/layout/Flex'
import Page from 'components/layout/Page'
import { useFarms, usePriceBnbBusd, usePriceCakeBusd, usePriceEthBnb } from 'state/hooks'
import useRefresh from 'hooks/useRefresh'
import { fetchFarmUserDataAsync } from 'state/actions'
import { QuoteToken } from 'config/constants/types'
import useI18n from 'hooks/useI18n'
import FarmCard, { FarmWithStakedValue } from './components/FarmCard/FarmCard'
import FarmTabButtons from './components/FarmTabButtons'
import Divider from './components/Divider'

export interface FarmsProps {
  tokenMode?: boolean
}

const Farms: React.FC<FarmsProps> = (farmsProps) => {
  const { path } = useRouteMatch()
  const TranslateString = useI18n()
  const farmsLP = useFarms()
  const cakePrice = usePriceCakeBusd()
  const bnbPrice = usePriceBnbBusd()
  const EthPrice = usePriceEthBnb()
  const { account, ethereum }: { account: string; ethereum: provider } = useWallet()
  const { tokenMode } = farmsProps

  const dispatch = useDispatch()
  const { fastRefresh } = useRefresh()
  useEffect(() => {
    if (account) {
      dispatch(fetchFarmUserDataAsync(account))
    }
  }, [account, dispatch, fastRefresh])

  const [stakedOnly, setStakedOnly] = useState(false)

  const activeFarms = farmsLP.filter(
    (farm) => !!farm.isTokenOnly === !!tokenMode && farm.multiplier !== '0X',
  )
  const inactiveFarms = farmsLP.filter(
    (farm) => !!farm.isTokenOnly === !!tokenMode && farm.multiplier === '0X',
  )

  const stakedOnlyFarms = activeFarms.filter(
    (farm) =>
      farm.userData && new BigNumber(farm.userData.stakedBalance).isGreaterThan(0),
  )

  // /!\ This function will be removed soon
  // This function compute the APY for each farm and will be replaced when we have a reliable API
  // to retrieve assets prices against USD
  const farmsList = useCallback(
    (farmsToDisplay, removed: boolean) => {
      // const cakePriceVsBNB = new BigNumber(farmsLP.find((farm) => farm.pid === CAKE_POOL_PID)?.tokenPriceVsQuote || 0)
      const farmsToDisplayWithAPY: FarmWithStakedValue[] = farmsToDisplay.map((farm) => {
        // if (!farm.tokenAmount || !farm.lpTotalInQuoteToken || !farm.lpTotalInQuoteToken) {
        //   return farm
        // }
        const cakeRewardPerBlock = new BigNumber(farm.eggPerBlock || 1)
          .times(new BigNumber(farm.poolWeight))
          .div(new BigNumber(10).pow(18))
        const cakeRewardPerYear = cakeRewardPerBlock.times(BLOCKS_PER_YEAR)

        let apy = cakePrice.times(cakeRewardPerYear)

        let totalValue = new BigNumber(farm.lpTotalInQuoteToken || 0)

        if (farm.quoteTokenSymbol === QuoteToken.BNB) {
          totalValue = totalValue.times(bnbPrice)
        }
        if (farm.quoteTokenSymbol === QuoteToken.ETH) {
          totalValue = totalValue.times(EthPrice)
        }

        if (totalValue.comparedTo(0) > 0) {
          apy = apy.div(totalValue)
        }

        return { ...farm, apy }
      })
      return farmsToDisplayWithAPY.map((farm) => (
        <FarmCard
          key={farm.pid}
          farm={farm}
          removed={removed}
          bnbPrice={bnbPrice}
          cakePrice={cakePrice}
          ethPrice={EthPrice}
          ethereum={ethereum}
          account={account}
        />
      ))
    },
    [bnbPrice, account, cakePrice, ethereum,EthPrice],
  )

  return (
    <Page>
      <Heading
        as="h1"
        size="xl"
        color="#aeaeae"
        mb="50px"
        style={{ textAlign: 'center' }}
      >
        {tokenMode ? 'Stake Tokens to Earn with Robinia Pools' : ''}
      </Heading>
      {/* <Heading as="h2" color="secondary" mb="50px" style={{ textAlign: 'center' }}>
        {TranslateString(10000, 'Deposit Fee will be used to buyback EGG')}
      </Heading> */}
     <FarmTabButtons stakedOnly={stakedOnly} setStakedOnly={setStakedOnly} />
      <div>
        <Divider />
        <FlexLayout>
          <Route exact path={`${path}`}>
            {stakedOnly
              ? farmsList(stakedOnlyFarms, false)
              : farmsList(activeFarms, false)}
          </Route>
          <Route exact path={`${path}/history`}>
            {farmsList(inactiveFarms, true)}
          </Route>
        </FlexLayout>
      </div>
      <div className="mb-10" />
      <div className="rbs-card mb-10">
        <div className="text-center text-green-800 text-3xl leading-10 mb-4">
          Launch Your Project on Robinia Now
        </div>
        <div className="p-1 flex flex-col md:flex-row items-center justify-around">
          <img src="/images/launch-project.svg" alt="project" width="400px" />
          <div className="flex flex-col">
            <div className="p-5 leading-7 text-lg text-gray-500">
              RobiniaSwap supports multiple blockchains through a cross-chain bridge.
              If you would like to grow with RobiniaSwap, please feel free to apply for our partnership program.
            </div>
            <div className="mx-5 my-2 py-4 rounded-full bg-secondary w-60 text-center text-white cursor-pointer shadow-lg">
              Apply to Launch
            </div>
          </div>
        </div>
      </div>
      <div className="mb-16" />
    </Page>
  )
}

export default Farms