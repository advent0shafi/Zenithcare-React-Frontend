import React from 'react'
import Sidebar from '../../../components/VendorsComponents/Sidebar'
import NavbarVendor from '../../../components/VendorsComponents/NavbarVendor'
import ProfileVendor from '../../../components/VendorsComponents/ProfileVendor'

const VendorHome = () => {
  const customStyle = {
    width: 'calc(0.05 + 75%)'
  };
  return (
    <>
<NavbarVendor/>
     
      
      <div class="flex mb-4">
  
  <div class="md:w-1/5 bg-[#051570] hidden md:block"><Sidebar/></div>
  <div class="w-3/4 ml-auto"><ProfileVendor/></div>
</div>
    </>
  )
}

export default VendorHome