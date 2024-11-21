import React from 'react';
import './TopSelling.css';
import a1 from '../../../../../public/assets/assetsCustomer/a1.png'
import a2 from '../../../../../public/assets/assetsCustomer/a2.jpg'
import a3 from '../../../../../public/assets/assetsCustomer/a3.jpg'
import a4 from '../../../../../public/assets/assetsCustomer/a4.jpg'
import a5 from '../../../../../public/assets/assetsCustomer/a5.jpg'


const TopSelling = () => {
    const mockData = [
        {
            id: '1',
            preview: a1,
            product: '	Samsung Galaxy Z Flip6 5G 12GB/256GB',
            price: 199.99,
            sold: 120,
            revenue: 23998.8,
        },
        {
            id: '2',
            preview: a2,
            product: '	Samsung Galaxy Z Flip6 5G 12GB/256GB',
            price: 1499.99,
            sold: 45,
            revenue: 67499.55,
        },
        {
            id: '3',
            preview: a3,
            product: '	Samsung Galaxy Z Flip6 5G 12GB/256GB',
            price: 349.99,
            sold: 75,
            revenue: 26249.25,
        },
        {
            id: '4',
            preview: a4,
            product: '	Samsung Galaxy Z Flip6 5G 12GB/256GB',
            price: 129.99,
            sold: 90,
            revenue: 11699.1,
        },
        {
            id: '5',
            preview: a5,
            product: '	Samsung Galaxy Z Flip6 5G 12GB/256GB',
            price: 249.99,
            sold: 60,
            revenue: 14999.4,
        },
    ];

    return (
        <div className="card top-selling overflow-auto">
            <div className="card-body pb-0">
                <h5 className="card-title">Top Selling</h5>

                <table className="table table-borderless">
                    <thead className="table-light">
                        <tr>
                            <th scope="col">Preview</th>
                            <th scope="col">Product</th>
                            <th scope="col">Price</th>
                            <th scope="col">Sold</th>
                            <th scope="col">Revenue</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mockData.map(item => (
                            <tr key={item.id}>
                                <td>
                                    <img
                                        src={item.preview}
                                        alt={item.product}
                                        className="img-thumbnail"
                                        style={{ width: '50px', height: '50px' }}
                                    />
                                </td>
                                <td>
                                    <a href="#" className='text-primary fw-bold'>
                                        {item.product}
                                    </a>
                                </td>
                                <td>${item.price.toFixed(2)}</td>
                                <td>{item.sold}</td>
                                <td>${(item.price * item.sold).toLocaleString('en-US')}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TopSelling;
