import React from 'react';
import './AdminDashboard.css';

import PageTitle from '../AdditionalSections/PageTitle/PageTitle';
import Card from '../AdditionalSections/Card/Card';
import Report from '../AdditionalSections/Report/Report';
import RecentSales from '../AdditionalSections/RecentSales/RecentSales';
import TopSelling from '../AdditionalSections/TopSelling/TopSelling';

const AdminDashboard = () => {
  return (
    <main id="main" className="main">
      <PageTitle page="Dashboard" />

      <section className="dashboard section">
        <div className="row">
          <Card /> {/* Render 4 cards từ Card.jsx */}
          <div className="col-12">
            <Report />
          </div>
          <div className="col-12">
            <RecentSales />
          </div>
          <div className="col-12">
            <TopSelling />
          </div>
        </div>
      </section>
    </main>
  );
};

export default AdminDashboard;
