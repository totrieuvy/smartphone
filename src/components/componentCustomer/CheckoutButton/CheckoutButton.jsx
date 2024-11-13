

import React from 'react';
import { useNavigate } from 'react-router-dom';

const CheckoutButton = ({ label = "Checkout", onClick, data }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
    navigate("/productDetailCustomer", { state: { data } });
    console.log('data:', data);
    console.log('Selected cartData:', data.userInfo);
  };

  return (
    <button className="primary-btn" onClick={handleClick}>
      {label}
    </button>
  );
};

export default CheckoutButton;

