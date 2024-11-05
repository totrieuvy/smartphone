import React, {useState, useEffect} from 'react'
import axios from 'axios';

import './RecentSales.css'
import CardFilter from '../CardFilter/CardFilter'
import RecentSalesTable from '../RecentSalesTable/RecentSalesTable'

const RecentSales = () => {
    const [items, setItems] = useState([])
    const [filter, setFilter] = useState('Today');
    const handleFilterChange = filter => {
        setFilter(filter)
    }

    useEffect(() => {
        axios.get('http://localhost:4000/recentsales')
          .then(response => setItems(response.data))
          .catch(error => console.error('Error fetching data:', error));
      }, []);

  return (
    <div className='card recent-sales overflow-auto'>
      <CardFilter filterChange={handleFilterChange}/>
    
      <div className="card-body">
        <h5 className="card-title">
            Recent Sales <span>| {filter}</span>
        </h5>
        <RecentSalesTable items={items}/>
      </div>
    </div>
  )
}

export default RecentSales
