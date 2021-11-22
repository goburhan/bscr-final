import React from 'react'
import Slider from 'react-slick'

const TopSliderCard = () => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    speed: 750,
    autoplaySpeed: 5000,
    arrows: false,
  }

  return (
    
      <div className="h-full mt-10 ">
                <div className="text-white text-4xl mb-8 leading-10">
                The First DEX on <span  className="text-primary">BSCR</span>  network with a three-type referral system
                </div>
                <div className="text-gray-500 text-lg leading-6">
                Enjoy profitable yield farming and exchanges with the lowest fees in DeFi space
                </div>
      </div>
    
  )
}

export default TopSliderCard
