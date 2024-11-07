import React, { useState, useEffect } from 'react'
import axios from 'axios';
import './TopSelling.css'
import CardFilter from '../CardFilter/CardFilter';
import TopSellingItem from '../TopSellingItem/TopSellingItem';

const TopSelling = () => {
    const [items, setItems] = useState([])
    const [filter, setFilter] = useState('Today');
    const handleFilterChange = filter => {
        setFilter(filter)
    }

    useEffect(() => {
        axios.get('http://localhost:4000/topselling')
            .then(response => setItems(response.data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <div className='card top-selling overflow-auto'>
            <CardFilter filterChange={handleFilterChange} />

            <div className="card-body pb-0">
                <h5 className="card-title">
                    Top Selling <span>| {filter}</span>
                </h5>

                <table className='table table-borderless'>
        <thead className='table-light'>
            <tr>
                <th scope='col'>Preview</th>
                <th scope='col'>Product</th>
                <th scope='col'>Price</th>
                <th scope='col'>Sold</th>
                <th scope='col'>Revenue</th>
            </tr>
        </thead>
        <tbody>
            {
                items && 
                items.length > 0 && 
                items.map(item => <TopSellingItem key={item._id} item={item}/>)
            }
        </tbody>
    </table>
            </div>
        </div>
    )
}

export default TopSelling
