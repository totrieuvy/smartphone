import { Outlet } from 'react-router-dom';
import React, { useState } from 'react';
import HeaderCustomer from './../../components/componentCustomer/Header/HeaderCustomer';
import FooterCustomer from './../../components/componentCustomer/Footer/FooterCustomer';
import './AutoAllign-Header-Footer.css';

function CustomerApp({ setSearchQuery }) {
  return (
    <div className="Header-Footer">
      <HeaderCustomer setSearchQuery={setSearchQuery} />
      <main className="autoAllign-Header-Footer">
        <Outlet />
      </main>
      <FooterCustomer />
    </div>
  );
}

export default CustomerApp;
