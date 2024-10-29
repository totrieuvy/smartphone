// FooterCustomer.jsx
import React from 'react';
import './FooterCustomer.css';

const FooterCustomer = () => {
    return (
        <footer className="footer-container">
            <div className="footer-column">
                <h3>Company support</h3>
                <p>Consultation: <span className="phone-number">0325 643 914</span></p>
                <p>Contact: <span className="phone-number">0325 643 914</span></p>
                <p>Warranty: <span className="phone-number">0325 643 914</span></p>
            </div>

            <div className="footer-column">
                <h3>Our company</h3>
                <a href="/introduction">Introduction</a>
                <a href="/hire">Hire</a>
            </div>

            <div className="footer-column">
                <h3>Others</h3>
                <a href="/order-history">Order history</a>
                <a href="/warranty-policy">Warranty policy</a>
            </div>

            <div className="footer-column">
                <h3>Our collaborators</h3>
                <div className="collaborators-logos">
                    <a href="https://cellphones.com.vn/" target="_blank" rel="noopener noreferrer">
                        <img src="src/components/componentCustomer/logo/logo-cellphones.jpg" alt="CellPhoneS" />
                    </a>
                    <a href="https://www.thegioididong.com/" target="_blank" rel="noopener noreferrer">
                        <img src="src/components/componentCustomer/logo/Amazon.png" alt="Amazon" />
                    </a>
                    <a href="https://www.amazon.com/" target="_blank" rel="noopener noreferrer">
                        <img src="src/components/componentCustomer/logo/Thegioigidong.webp" alt="TheGioiDiDong" />
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default FooterCustomer;
