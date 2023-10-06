import React from 'react'
import Navbar from '../../../components/Navbar'
import Hero from '../../../components/Hero'
import Trusted from '../../../components/Trusted'
import TopTherapist from '../../../components/TopTherapist'
import Booster from '../../../components/Booster'
import Feedback from '../../../components/Feedback'
import Therapist from '../../../components/Therapist'
import Blog from '../../../components/Blog'
import Footer from '../../../components/Footer'


const Home = () => {
  return (
    <div>
      <Navbar/>
<Hero/>
<TopTherapist/>
<Booster/>
<Feedback/>
<Therapist/>
<Trusted/>
<Blog/>
<Footer/>

    </div>
  )
}

export default Home