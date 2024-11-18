import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Card.css';

const Card = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch total products từ MockAPI sản phẩm
        const productResponse = await axios.get('https://669475034bd61d8314c77f1a.mockapi.io/khanh');
        const totalProducts = productResponse.data.length;

        // Fetch total customers từ MockAPI account
        const accountResponse = await axios.get('https://6692a166346eeafcf46da14d.mockapi.io/account');
        const totalCustomers = accountResponse.data.filter((item) => item.role === 'customer').length;

        const cardData = [
          {
            name: 'Revenue',
            icon: 'bx bx-money',
            amount: 50000,
            percentage: 0.25,
          },
          {
            name: 'Sales',
            icon: 'bx bx-shopping-bag',
            amount: 200,
            percentage: 0.1,
          },
          {
            name: 'Total Products',
            icon: 'bx bx-box',
            amount: totalProducts,
            percentage: -0.11,
          },
          {
            name: 'Customers',
            icon: 'bx bx-user',
            amount: totalCustomers,
            percentage: 0.4,
          },
        ];

        setCards(cardData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {cards.map((card, index) => (
        <div className="col-xxl-3 col-md-4">
          <div className="card info-card sales-card">
            <div className="card-body" key={index}>
              <h5 className="card-title">
                {card.name}
              </h5>
              <div className="d-flex align-items-center">
                <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                  <i className={card.icon}></i>
                </div>
                <div className="ps-3">
                  <h6>
                    {card.name === 'Revenue'
                      ? '$' + card.amount.toLocaleString('en-US')
                      : card.amount.toLocaleString('en-US')}
                  </h6>
                  <span
                    className={`${
                      card.percentage > 0 ? 'text-success' : 'text-danger'
                    } small pt-1 fw-bold`}
                  >
                    {Math.abs(card.percentage * 100)}%
                  </span>
                  <span className="text-muted small pt-2 ps-1">
                    {card.percentage > 0 ? 'increase' : 'decrease'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Card;
