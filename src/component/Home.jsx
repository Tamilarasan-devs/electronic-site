import React from 'react'
import OurServices from './OurServices'
import SecondBanner from './SecondBanner'
import Banner from './Banner'
import ThirdSection from './ThirdSection'
import TvCardBrands from './TvCardsBrand'
import StaticSection from './StaticSection'
import TvServices from './TvServices'
import WhyChoose from './WhyChoose'

import Brand from './Brand'
export default function Home() {
  return (
    <div className=''>
        <Banner/>
<SecondBanner/>

<ThirdSection/>
<OurServices/>

<WhyChoose/>
<StaticSection/>

<TvServices/>
{/* <TvCardBrands/> */}
<Brand/>
    </div>
  )
}
