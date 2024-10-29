import { Outlet } from 'react-router-dom';
import React from 'react';
import AdminHeader from '../../components/admin/AdminHeader/AdminHeader'
import AdminFooter from '../../components/admin/AdminFooter/AdminFooter'
import AdminSidebar from '../../components/admin/AdminSidebar/AdminSidebar';

function AdminApp() {
  return (
    <div className="all">
      <AdminHeader />
      <div className="main-content">
        <AdminSidebar /> {/* Include the sidebar */}
        <main className="main">
          <Outlet />
        </main>
      </div>
      <AdminFooter />
    </div>
  );
}

export default AdminApp;
