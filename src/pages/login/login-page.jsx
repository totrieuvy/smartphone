import React, { useRef } from 'react';
import Login from './Login-Form/Login-Form';
import ShopSection from './Shop-section/Shop-section';
import TermsOfService from './Terms-of-service/TermsOfService';

const LoginPage = () => {
    const termsRef = useRef(null);

    return (
        <>
            <Login termsRef={termsRef} />
            <ShopSection />
            <TermsOfService ref={termsRef} />
        </>
    );
};

export default LoginPage;
