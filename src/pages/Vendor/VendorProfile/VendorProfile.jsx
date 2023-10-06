import React from 'react'
import Sidebar from '../../../components/VendorsComponents/Sidebar'
import NavbarVendor from '../../../components/VendorsComponents/NavbarVendor'
import images from "./../../../assets/doctor.png";
import image from "./../../../assets/logiko.png";
const VendorProfile = () => {
  return (
    <>
<NavbarVendor/>
     
      
      <div class="flex mb-4">
  
  <div class="md:w-1/5  hidden md:block"><Sidebar/></div>
  <div class="w-3/4">
  <div class="md:flex mb-4">
        <div class="md:w-1/4 w-full h-full ">
          <div className="bg-white mt-4 ml-3 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] ">
            <div className=" rounded-full">
              <div className="rounded-full ">
                <img className="rounded-full  mt-4" src={images} />
              </div>
            </div>
            <div className="md:p-5 p-10 ">
              <h1 className="mb-4 text-2xl text-[#051570] font-semibold">
                {" "}
                Dr. Kavya Shree
              </h1>
              <p className="text-[#FF6600]"> ® Certified & Verified</p>
              <h3>☑ Top NIMHANS Psychiatrist</h3>
              <h3>☑ Top NIMHANS Psychiatrist</h3>
              <h3>☑ Top NIMHANS Psychiatrist</h3>
            </div>
            <div className="flex justify-center p-4 items-center">
              <button className="bg-transparent hover:bg-[#051570]  text-[#051570] text-xl font-bold hover:text-white py-2 px-4 border border-[#051570] hover:border-transparent shadow-lg rounded-[200px] transition duration-300 ease-in-out transform hover:scale-105">
                Book Session
              </button>
            </div>
          </div>
        </div>
        <div class="md:w-3/4 w-full p-4">
          <div className=" bg-white p-7 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
            <div className="flex justify-center items-center">
              <img className="w-[80px] pl-1" src={image} alt="" />
            </div>
            <p className="mt-4 font-semibold">
              I’m Dr. Kavya Shree, the university topper with multiple gold
              medals in MBBS from Tamil Nadu Dr. MGR University. Following
              which, my passion towards psychiatry grew (as understanding one’s
              human mind is always a challenge) during my stint at a corporate
              hospital while preparing for my PG entrance. Subsequently, I
              completed my MD in Psychiatry from the same University. I have
              been an excellent doctor, an inspiring teacher, and an empathetic
              doctor throughout this journey.
            </p>

            <p className="mt-4 font-semibold">
              I am a firm believer that technology has the capability to
              transform and enhance healthcare services. ‘Manastha’ is one such
              integration of healthcare and technology, hence I’m here. It helps
              me reach clients all over India as well as other parts of the
              world. Multilingual proficiency enables me to reach clients of
              varied tongues like English, Tamil, Hindi, and Malayalam.
            </p>

            <p className="mt-4 font-semibold">
              I look at clients in a holistic perspective. After all, mental
              health is holistic. I explore the biological, psychological,
              social, and spiritual factors involved in the predisposition,
              precipitation, and perpetuation of any psychiatric illnesses.
              Scientific evidence guides my decisions, giving equal importance
              to psychotherapy as well as pharmacotherapy.
            </p>

            <p className="mt-4 font-semibold">
              I have developed keen understanding and expertise in the
              multifarious sub-specialties of Psychiatry, as every aspect of
              Psychiatry fascinates me. I am very approachable for topics
              considered taboo by many others like sexuality and sexual
              disorders, gender identity, substance abuse, etc. I am also
              equipped to deal with Personality issues, Child Psychiatry,
              Geriatric Psychiatry, etc.
            </p>

            <p className="mt-4 font-semibold">
              As someone who studied Psychiatry by choice and not by chance, I
              would say I am a good choice for the clients.
            </p>
          </div>
        {/* <div className="bg-gray-500 h-16 mt-4">
            <div className="bg-green-900 h-52"></div>
        </div> */}
        </div>
      </div>
   
  </div>
</div>
    </>
  )
}

export default VendorProfile