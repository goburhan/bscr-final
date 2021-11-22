import React from 'react'
import Page from 'components/layout/Page'
import Socials from 'components/Partials/Socials'
import FarmStakingCard from './components/FarmStakingCard'
import TopSliderCard from './components/TopSliderCard'
import CakeStats from './components/CakeStats'
import TopFarms from './components/TopFarms'
import Announcements from './components/Announcements'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import '../../style/slider-dots.css'
import StakeEarn from './components/StakeEarn'
import TotalValueLocked from './components/TotalValueLocked'
import AllStats from './components/AllStats'

const Home: React.FC = () => {
  return (
    <Page>
      <div>
        <div className="grid grid-cols-4 sm:grid-cols-2 md:grid-cols-14 gap-4">
          
          <div className="col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-5 col-start-0 lg:col-start-3">
            <TopSliderCard />
          </div>
          <div className="col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-5">
            <CakeStats />
          </div>
          <div className="col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-2 lg:col-start-3">
            <StakeEarn />
          </div>
          <div className="col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-4 ">
            <TotalValueLocked />
          </div>
          <div className="col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-4">
            <AllStats />
          </div>
          <div className="col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-5 col-start-0 lg:col-start-3">
            <FarmStakingCard />
          </div>
          <div className="col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-5">
            <Announcements />
          </div>
          <div className="col-span-12 mb-20">
            <TopFarms />
          </div>
        </div>
      </div>
    </Page>
  )
}

export default Home
