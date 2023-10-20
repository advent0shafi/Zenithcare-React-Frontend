
import React from 'react'
import AdminSidebar from '../../../components/AdminHelpers/AdminSidebar'
import AdminHeader from '../../../components/AdminHelpers/AdminHeader'
import UserTable from '../../../components/AdminHelpers/AdminUserList/UserTable'
const AdminApproveList = () => {
 const urlEndpoint = 'verify-pending'
 const button_endpoint = 'vendor_approve';

  return (
    <div>
      <main className="relative  overflow-hidden bg-gray-100 dark:bg-gray-800">
        <div className="flex items-start justify-between">
       <AdminSidebar/>
          <div className="flex flex-col w-full md:space-y-4">
            <AdminHeader/>
            <div className='p-4'>

            <UserTable  urlEndpoint={urlEndpoint} Button_Endpoint={button_endpoint}
              IsTherapist = {false}
            />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}


export default AdminApproveList