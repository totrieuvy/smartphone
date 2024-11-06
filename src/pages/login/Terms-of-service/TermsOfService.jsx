import React, { forwardRef } from 'react';
import { Row, Col, Card } from 'antd';
import { useInView } from 'react-intersection-observer';
import { useSpring, animated } from 'react-spring';
import './TermsOfService.css';

const TermsOfService = forwardRef((props, ref) => {
    const { inView, ref: inViewRef } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    // Combine the refs so that both `inViewRef` and the passed `ref` work together
    const setRefs = (node) => {
        inViewRef(node);
        if (ref) ref.current = node;
    };

    const animation = useSpring({
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(50px)',
        config: { duration: 700 },
    });

    return (
        <div className="terms-section" ref={setRefs}>
            <h2>Terms of Service</h2>
            <animated.div style={animation}>
                <Row gutter={16} justify="center">
                    <Col xs={24} sm={12} md={8}>
                        <Card className="terms-card" title="User Accounts" bordered={false}>
                            <p>All users are required to create an account to place an order. Users are responsible for maintaining the confidentiality of their accounts and passwords.</p>
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} md={8}>
                        <Card className="terms-card" title="Payment Terms" bordered={false}>
                            <p>All payments must be completed before the shipment of products. Accepted payment methods include credit card, debit card, and online payment gateways.</p>
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} md={8}>
                        <Card className="terms-card" title="Return Policy" bordered={false}>
                            <p>Items can be returned within 30 days of purchase. The product must be unused and in its original packaging for a full refund.</p>
                        </Card>
                    </Col>
                </Row>
                <Row gutter={16} justify="center" style={{ marginTop: '16px' }}>
                    <Col xs={24} sm={12} md={8}>
                        <Card className="terms-card" title="Privacy Policy" bordered={false}>
                            <p>Your personal information will be kept confidential. We use industry-standard encryption to protect your data.</p>
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} md={8}>
                        <Card className="terms-card" title="Shipping" bordered={false}>
                            <p>Shipping times vary based on location. Once shipped, you will receive a tracking number. Delays may occur due to unforeseen circumstances.</p>
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} md={8}>
                        <Card className="terms-card" title="Limitation of Liability" bordered={false}>
                            <p>Our liability is limited to the purchase price of the product. We are not responsible for any indirect, special, or consequential damages.</p>
                        </Card>
                    </Col>
                </Row>
            </animated.div>
        </div>
    );
});

export default TermsOfService;
