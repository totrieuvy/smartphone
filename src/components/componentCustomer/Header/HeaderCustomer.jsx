// HeaderCustomer.jsx
import React from 'react';
import { Input, Dropdown, Menu } from 'antd';
import './HeaderCustomer.css';
import { FiShoppingCart } from "react-icons/fi";
import { FaLocationDot, FaMagnifyingGlass, FaRegCircleUser } from "react-icons/fa6";

const { Search } = Input;

const HeaderCustomer = () => {
    const handleMenuClick = (e) => {
        switch (e.key) {
            case 'profile':
                window.location.href = '/customer/profile';
                break;
            case 'changePassword':
                window.location.href = '/customer/change-password';
                break;
            case 'login':
                window.location.href = '/login';
                break;
            case 'logout':
                // Add logout logic here
                window.location.href = '/login';
                break;
            default:
                break;
        }
    };

    const menu = (
        <Menu onClick={handleMenuClick}>
            <Menu.Item key="profile">Profile</Menu.Item>
            <Menu.Item key="changePassword">Change Password</Menu.Item>
            <Menu.Item key="login">Login</Menu.Item>
            <Menu.Item key="logout">Logout</Menu.Item>
        </Menu>
    );

    return (
        <header className="header-container">
            <div className="header-left">
                <img src="src/components/componentCustomer/logo/ShopLogo-removebg-preview.png" alt="Logo" className="logo" />
                <span className="shop-title" onClick={() => window.location.href = '/'} style={{ cursor: 'pointer' }}>
                    Amazing-FPT Shop
                </span>
            </div>
            <div className="header-center">
                <Search
                    placeholder="Search products..."
                    className="search-bar"
                    enterButton={<FaMagnifyingGlass />}
                    style={{ width: 450 }}
                    enterButtonStyle={{ backgroundColor: '#dcdcdc', borderColor: '#dcdcdc' }}
                />
            </div>
            <div className="header-right">
                <div className="header-icon">
                    <FiShoppingCart className="icon" />
                    <span className='Header-Cart'>Cart</span>
                </div>
                <Dropdown overlay={menu} trigger={['click']}>
                    <div className="header-icon" style={{ cursor: 'pointer' }}>
                        <FaRegCircleUser className="icon" />
                        <span className='Header-Profile'>Profile</span>
                    </div>
                </Dropdown>
                <div className="location">
                    <FaLocationDot className="location-icon" />
                    <span>Hồ Chí Minh</span>
                </div>
            </div>
        </header>
    );
};

export default HeaderCustomer;
