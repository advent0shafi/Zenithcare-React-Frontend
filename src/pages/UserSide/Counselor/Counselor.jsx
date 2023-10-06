import React from 'react'
import Navbar from '../../../components/Navbar'
import ConCard from '../../../components/helpers/ConCard'
import Footer from '../../../components/Footer'
import HCards from '../../../components/helpers/HCards'
import Buttons from '../../../components/helpers/Buttons'
import Filters from '../../../components/helpers/Filters'

const Counselor = () => {
  
  return (
    <div>
<Navbar/>

<div className='bg-white p-4'>
    <div className=' rounded mb-4 p-16 '>
      <Filters/>
        {/* <div className='bg-white flex gap-3 justify-between '> */}
          
{/* 
        <Buttons filter={"expereince"}/>
        <Buttons filter={"Type"}/>
        <Buttons filter={"Rating"}/>
        <Buttons filter={"Locations"}/>
        <Buttons filter={""}/> */}
        {/* </div> */}
    </div>
{/* <ConCard/>
<ConCard/>
<ConCard/> */}
<HCards/>
<HCards/>
<HCards/>
<HCards/>
</div>

<Footer/>
    </div>
  )
}

export default Counselor