import React, { useState } from 'react';
import { Input } from 'antd';
import './HeaderCustomer.css';
import { FiShoppingCart } from "react-icons/fi";
import { FaLocationDot, FaMagnifyingGlass, FaRegCircleUser } from "react-icons/fa6";
import CartModal from '../../../pages/customer/CartModal/CartModal';

const { Search } = Input;

const HeaderCustomer = ({ setSearchQuery }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);

    const closeCartModal = () => {
        setIsCartOpen(false); 
    };

    const handleCartClick = () => {
        setIsCartOpen(true);
    };

    const onSearch = (value) => {
        setSearchQuery(value);
    };

    return (
        <header className="header-container">
            <div className="header-left">
                <img src="src/components/componentCustomer/logo/ShopLogo-removebg-preview.png" alt="Logo" className="logo" />
                <span className="shop-title">Amazing-FPT Shop</span>
            </div>
            <div className="header-center">
                <Search
                    placeholder="Search products..."
                    className="search-bar"
                    enterButton={<FaMagnifyingGlass />}
                    style={{ width: 450 }}
                    enterButtonStyle={{ backgroundColor: '#dcdcdc', borderColor: '#dcdcdc' }}
                    onSearch={onSearch} // Trigger search
                />
            </div>
            <div className="header-right">
                <div className="header-icon" onClick={handleCartClick}>
                    <FiShoppingCart className="icon" />
                    <span className='Header-Cart'>Cart</span>
                </div>
                <div className="header-icon">
                    <FaRegCircleUser className="icon" />
                    <span className='Header-Login'>Login</span>
                </div>
                <div className="location">
                    <FaLocationDot className="location-icon" />
                    <span>Hồ Chí Minh</span>
                </div>
            </div>
            <CartModal isOpen={isCartOpen} onClose={closeCartModal} />
        </header>
    );
};

export default HeaderCustomer;
