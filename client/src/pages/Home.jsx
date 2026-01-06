import OurServices from '@/components/home/OurServices'
import ServicesCard from '@/components/home/ServicesCard'
import Slider from '@/components/home/Slider'
import TrendingServices from '@/components/home/TrendingServices'
import WebLayout from '@/layout/WebLayout'
import React from 'react'

const Home = () => {
  return (
    <WebLayout>
      <div className="relative">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute top-96 right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl"></div>
        </div>

        {/* Content */}
        <div className="relative z-10">
          <Slider />
          <ServicesCard />
          <OurServices />
          <TrendingServices />
        </div>
      </div>
    </WebLayout>
  )
}

export default Home