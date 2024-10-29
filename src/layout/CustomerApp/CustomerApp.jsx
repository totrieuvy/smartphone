
import { Outlet } from 'react-router-dom';
// import Footer from '../../components/componentCensor/Footer/FooterCensor.jsx';
// import Header from '../../components/componentCensor/Header/HeaderCensor.jsx';
import React from 'react';


function CustomerApp() {
  return (
    <div className="all">
      <header className="header">
        <Header />
      </header>
      <main className="main">
        <Outlet />
      </main>
      <footer className="footer">
        <Footer />
      </footer>
    </div>
  );
}

export default CensorApp;
