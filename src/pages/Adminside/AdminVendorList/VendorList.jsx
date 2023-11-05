
import React from 'react'
import AdminSidebar from '../../../components/AdminHelpers/AdminSidebar'
import AdminHeader from '../../../components/AdminHelpers/AdminHeader'
import UserTable from '../../../components/AdminHelpers/AdminUserList/UserTable'
const VendorList = () => {
 const urlEndpoint = 'vendorlist'
 const button_endpoint = 'block';

  return (
    <div>
      <main className="relative h-screen overflow-hidden bg-gray-100 dark:bg-gray-800">
        <div className="flex items-start justify-between">
          <AdminSidebar/>
          <div className="flex flex-col w-full md:space-y-4">
            <AdminHeader/>
            <div className='p-4'>

            <UserTable  urlEndpoint={urlEndpoint} Button_Endpoint={button_endpoint}
            IsTherapist = {true}
            />
            </div>
          </div>
        </div>
      </main>
    </div>
    
  )
}


export default VendorList