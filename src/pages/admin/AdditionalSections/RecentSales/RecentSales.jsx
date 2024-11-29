import React from 'react'
import './RecentSales.css'
import RecentSalesTable from '../RecentSalesTable/RecentSalesTable'

const RecentSales = () => {

  return (
    <div className='card recent-sales overflow-auto'>
      <div className="card-body">
        <h5 className="card-title">
            Recent Sales
        </h5>
        <RecentSalesTable/>
      </div>
    </div>
  )
}

export default RecentSales
