
import React from 'react';
import { useNavigate } from 'react-router-dom';

const CheckoutButton = ({ label = "Checkout", onClick }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
    navigate("/productDetailCustomer");
  };

  return (
    <button className="primary-btn" onClick={handleClick}>
      {label}
    </button>
  );
};

export default CheckoutButton;
