import React from 'react'
import Cards from './InnerComponents/Cards'
import Slider from 'react-slick'

const TopTherapist = () => {
    var settings = {
        dots: true,
        infinite: false,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 4,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 3,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
          // You can unslick at a given breakpoint now by adding:
          // settings: "unslick"
          // instead of a settings object
        ]
        

      };
    
  return (
    <div className='w-full bg-[#E9F8F3B2] pl-7 pr-7 py-32'>
        <div className='md:max-w-[1326px] m-auto max-w-[350px]'>
       <h1 className='text-3xl font-bold'>Our Top <span className='text-[#051570]'>Therapists</span> and  <span className='text-[#051570]'>Psychiatrist</span>
</h1>
<p className='py-3 text-[#536E96]'>Book an appointment online and see them on a video visit.</p>

        <Slider {...settings}>

        <Cards/>
        <Cards/>
        <Cards/>
            <Cards/>
        </Slider>
            </div>

    </div>
  )
}

export default TopTherapist