import React from 'react'
import AdminSidebar from '../../../components/AdminHelpers/AdminSidebar'
import AdminHeader from '../../../components/AdminHelpers/AdminHeader'
import UserTable from '../../../components/AdminHelpers/AdminUserList/UserTable'
const UserList = () => {
  return (
    <div>
      <main className="relative  overflow-hidden bg-gray-100 dark:bg-gray-800">
        <div className="flex items-start justify-between">
       <AdminSidebar/>
          <div className="flex flex-col w-full md:space-y-4">
            <AdminHeader/>
            <div className='p-8'>

           <UserTable/>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default UserList