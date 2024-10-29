
import { Outlet } from 'react-router-dom';
import React from 'react';
import HeaderCustomer from './../../components/componentCustomer/Header/HeaderCustomer';
import FooterCustomer from './../../components/componentCustomer/Footer/FooterCustomer';
import './AutoAllign-Header-Footer.css';


function CustomerApp() {
  return (
    <div className="Header-Footer">
      <HeaderCustomer />
      <main className="autoAllign-Header-Footer">
        <Outlet />
      </main>
      <FooterCustomer />
    </div>
  );
}

export default CustomerApp;
