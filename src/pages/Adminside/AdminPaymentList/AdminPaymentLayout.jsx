import React from 'react';
import AdminPaymentList from './AdminPaymentList';
import AdminHeader from '../../../components/AdminHelpers/AdminHeader';
import AdminSidebar from '../../../components/AdminHelpers/AdminSidebar';

const AdminPaymentLayout = () => {
  return (
    <>
       <div>
      <main className="relative h-screen overflow-hidden bg-gray-100 dark:bg-gray-800">
        <div className="flex items-start justify-between">
          <AdminSidebar/>
          <div className="flex flex-col w-full md:space-y-4">
            <AdminHeader/>
              <AdminPaymentList />
          </div>
        </div>
      </main>
      </div>
    </>
  );
};

export default AdminPaymentLayout;
