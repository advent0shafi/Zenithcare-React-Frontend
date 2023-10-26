import React from 'react'
import AdminHeader from '../../../components/AdminHelpers/AdminHeader'
import AdminSidebar from '../../../components/AdminHelpers/AdminSidebar'
import AdminVendorPayment from './AdminVendorPayment'

const AdminVendorPaymentLayout = () => {
  return (
    <>
     <main className="relative h-screen overflow-hidden bg-gray-100 dark:bg-gray-800">
        <div className="flex items-start justify-between">
          <AdminSidebar/>
          <div className="flex flex-col w-full md:space-y-4">
            <AdminHeader/>
            <AdminVendorPayment/>

          </div>
        </div>
      </main>
    

    </>
  )
}

export default AdminVendorPaymentLayout