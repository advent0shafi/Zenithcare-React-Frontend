import React from 'react'
import Navbar from '../../../components/landingPages/Navbar'
import Hero from '../../../components/landingPages/Hero'
import Trusted from '../../../components/landingPages/Trusted'
import TopTherapist from '../../../components/landingPages/TopTherapist'
import Booster from '../../../components/landingPages/Booster'
import Feedback from '../../../components/landingPages/Feedback'
import Therapist from '../../../components/landingPages/Therapist'
import Blog from '../../../components/landingPages/Blog'
import Footer from '../../../components/landingPages/Footer'


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