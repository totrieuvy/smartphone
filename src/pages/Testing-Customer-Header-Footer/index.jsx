// HeaderAndFooterTesting.jsx
import React from 'react';
import HeaderCustomer from '../../components/componentCustomer/Header/HeaderCustomer';
import FooterCustomer from '../../components/componentCustomer/Footer/FooterCustomer';
import { Outlet } from 'react-router-dom';
import './AutoAllign-Header-Footer.css';

const HeaderAndFooterTesting = () => {
    return (
        <div className="Header-Footer">
            <HeaderCustomer />
            <main className="autoAllign-Header-Footer">
                {/* Add content here to test between header and footer */}
                <h1>Welcome to Header and Footer Testing Page</h1>
                <p>This is the content area where you can test the layout.</p>
            </main>
            <Outlet/>
            <FooterCustomer />
        </div>
    );
};

export default HeaderAndFooterTesting;
