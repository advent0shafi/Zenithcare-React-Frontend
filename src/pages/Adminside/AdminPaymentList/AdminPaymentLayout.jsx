import React from 'react';
import AdminPaymentList from './AdminPaymentList';
import AdminHeader from '../../../components/AdminHelpers/AdminHeader';
import AdminSidebar from '../../../components/AdminHelpers/AdminSidebar';

const AdminPaymentLayout = () => {
  return (
    <>
      <main className="">
        <div className="flex items-start justify-between">
          <AdminSidebar />
          <div className="flex flex-col w-full md:w-3/4"> {/* Adjust the width here */}
            <AdminHeader />
              <AdminPaymentList />
          </div>
        </div>
      </main>
    </>
  );
};

export default AdminPaymentLayout;
