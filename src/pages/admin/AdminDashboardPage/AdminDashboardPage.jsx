import React from 'react'
import './AdminDashboardPage.css'
import AdminSidebar from '../../../components/admin/AdminSidebar/AdminSidebar'
import AdminDashboard from '../../../pages/admin/AdminDashboard/AdminDashboard'

const AdminDashboardPage = () => {
  return (
    <div>
      <AdminSidebar/>
      <AdminDashboard/>
    </div>
  )
}

export default AdminDashboardPage
