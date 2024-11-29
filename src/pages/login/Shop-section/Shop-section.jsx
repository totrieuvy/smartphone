import { Card, Col, Row } from 'antd';
import './Shop-section.css';
import { useInView } from 'react-intersection-observer';
import { useSpring, animated } from 'react-spring';
import { FaTabletAlt } from "react-icons/fa";
import { GiSmartphone } from "react-icons/gi";
import { BsSmartwatch } from "react-icons/bs";
import { TbDeviceAirpods } from "react-icons/tb";
const ShopSection = () => {
    // useInView hook to track if the section is in view
    const { ref, inView } = useInView({
        triggerOnce: false, // Only trigger once
        threshold: 0.5, // Trigger when 50% of the section is in view
    });

    // useSpring hook to animate opacity and transform
    const animation = useSpring({
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(50px)',
        config: { duration: 500 }, // Adjust this value to make the animation faster or slower

    });

    return (
        <div className="shop-section">
        <h2>Welcome to our shop, we sell:</h2>
        <animated.div style={animation} ref={ref}>
            <Row gutter={16} justify="center">
                <Col xs={24} sm={12} md={6}>
                    <Card
                        className="product-card"
                        hoverable
                        cover={<FaTabletAlt style={{ fontSize: '80px', color: '#ff416c', padding: '15px' }} />}
                        title="iPads"
                    >
                        <p>Discover our range of iPads with the latest features and cutting-edge technology.</p>
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <Card
                        className="product-card"
                        hoverable
                        cover={<GiSmartphone style={{ fontSize: '80px', color: '#ff416c', padding: '15px' }} />}
                        title="Smartphones"
                    >
                        <p>Explore our smartphones, packed with innovative features and powerful performance.</p>
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <Card
                        className="product-card"
                        hoverable
                        cover={<BsSmartwatch style={{ fontSize: '80px', color: '#ff416c', padding: '15px' }} />}
                        title="Smartwatches"
                    >
                        <p>A powerful combination between performance and portability.</p>
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <Card
                        className="product-card"
                        hoverable
                        cover={<TbDeviceAirpods style={{ fontSize: '80px', color: '#ff416c', padding: '15px' }} />}
                        title="Accessories"
                    >
                        <p>Necessary gadgets that pack a punch.</p>
                    </Card>
                </Col>
            </Row>
        </animated.div>
    </div>
    
    );
};

export default ShopSection;