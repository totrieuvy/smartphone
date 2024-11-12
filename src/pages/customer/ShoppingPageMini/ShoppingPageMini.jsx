import React, { useState, useEffect } from 'react';
import "./ShoppingPageMini.scss";
import { useNavigate } from 'react-router-dom';
import MoMoImage from '/assets/assetsCustomer/images.png';
import VNPayImage from '/assets/assetsCustomer/download.png';
import RuPayImage from '/assets/assetsCustomer/download (1).png';
import { useLocation } from 'react-router-dom';
import { Gift } from 'lucide-react';
import CheckoutButton from '../../../components/componentCustomer/CheckoutButton/CheckoutButton';

const ShoppingPageMini = () => {
    const location = useLocation();
    const { selectedProducts } = location.state || {};  // Lấy dữ liệu từ state

    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        if (selectedProducts) {
            setCartItems(selectedProducts);
        }
    }, [selectedProducts]);

    // Kiểm tra xem dữ liệu đã được truyền hay chưa
    useEffect(() => {
        if (selectedProducts) {
            console.log("Received selected products:", selectedProducts);
        }
    }, [selectedProducts]);


    const [selectedWarranty, setSelectedWarranty] = useState(null);
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [selected, setSelected] = useState(null);

    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);

    const [selectedProvince, setSelectedProvince] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedWard, setSelectedWard] = useState('');



    const warrantyOptions = [
        {
            id: 1,
            name: 'Đặc quyền bảo hành 2 năm',
            price: 29.99,
            originalPrice: 89.99
        },
        {
            id: 2,
            name: 'Đặc quyền 12 tháng 1 đổi 1',
            price: 39.99,
            originalPrice: 89.99
        },
        {
            id: 3,
            name: 'Dịch vụ F.Studio Premium Care',
            price: 59.99,
            originalPrice: null
        },
        {
            id: 4,
            name: 'BHV (Bảo hành lần 3 đổi máy mới)',
            price: 70.99,
            originalPrice: null
        }
    ];

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(price);
    };


    const bonusItems = [
        'Kèm sạc, cáp sạc nhanh 33/ 67/ 120/ 160w (tùy mẫu), tai nghe AKG, ốp lưng (tùy mã), dán bảo vệ lưng, cáp lấy sim',
        'Tặng Voucher giảm giá lên đến 450.000 đ khi mua điện thoại, máy tính bảng, laptop',
        'Tặng Voucher giảm 30% khi mua phụ kiện',
        'Tặng gói "bảo hành phụ kiện" (trọn đời)',
        'Miễn phí giao hàng toàn quốc'
    ];

    const warrantyItems = [
        'Bao test 15 ngày 1 đổi 1, đổi màu và đổi dung lượng miễn phí (đối dòng khác khấu trừ 10-15% trong 7 ngày đầu)',
        'Bảo hành tiêu chuẩn 6 tháng tại Dế Mobile',
        'Bảo hành thay pin miễn phí (khi pin chai/ hư trong thời gian còn hạn bảo hành)',
        'Bảo hành phụ kiện miễn phí (trọn đời - không giới hạn thời gian)'
    ];

    // Fetch provinces on component mount
    useEffect(() => {
        const fetchProvinces = async () => {
            try {
                const response = await fetch('https://provinces.open-api.vn/api/p/');
                const data = await response.json();
                setProvinces(data);
            } catch (error) {
                console.error('Error fetching provinces:', error);
            }
        };
        fetchProvinces();
    }, []);

    // Fetch districts when province is selected
    useEffect(() => {
        const fetchDistricts = async () => {
            if (selectedProvince) {
                try {
                    const response = await fetch(`https://provinces.open-api.vn/api/p/${selectedProvince}?depth=2`);
                    const data = await response.json();
                    setDistricts(data.districts);
                    setSelectedDistrict('');
                    setSelectedWard('');
                    setWards([]);
                } catch (error) {
                    console.error('Error fetching districts:', error);
                }
            }
        };
        fetchDistricts();
    }, [selectedProvince]);

    // Fetch wards when district is selected
    useEffect(() => {
        const fetchWards = async () => {
            if (selectedDistrict) {
                try {
                    const response = await fetch(`https://provinces.open-api.vn/api/d/${selectedDistrict}?depth=2`);
                    const data = await response.json();
                    setWards(data.wards);
                    setSelectedWard('');
                } catch (error) {
                    console.error('Error fetching wards:', error);
                }
            }
        };
        fetchWards();
    }, [selectedDistrict]);

    const handleSelect = (method) => {
        setSelected(method);
    };

    const handleNextStep = () => {
        if (step < 3) {
            setStep(step + 1);
        }
    };

    const handlePrevStep = () => {
        if (step > 1) {
            setStep(step - 1);
        }
    };

    const increaseQuantity = (id) => {
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === id && item.quantity < item.stock
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            )
        );
    };

    // Hàm giảm số lượng sản phẩm
    const decreaseQuantity = (id) => {
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === id && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
        );
    };

    // Hàm xóa sản phẩm khỏi giỏ hàng
    const deleteItem = (id) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    };

    // Điều hướng đến trang khác khi người dùng tiếp tục mua sắm
    const handleShoppingContinue = () => {
        navigate('/category/1');
    };
    const handleWarrantyClick = (id) => {
        setSelectedWarranty(currentSelected => currentSelected === id ? null : id);
    };

    return (
        <div className="shopping-container1">
            <div className="cart-section1">
                <p
                    className="continue-shopping1 cursor-pointer flex items-center gap-2 text-gray-600 hover:text-gray-900"
                    onClick={handleShoppingContinue}
                >
                    Continue Shopping
                </p>


                <div className="cart-item-container1">
                    {cartItems?.length > 0 ? (
                        cartItems.map(item => (
                            <div key={item.id} className="cart-item1">
                                <img
                                    src={item.img}
                                    alt={item.name}
                                    className="product-image1"
                                    onError={(e) => e.target.src = "/assets/default-image.png"}
                                />
                                <div className="item-info1">
                                    <h3 className="product-name">{item.name}</h3>
                                    <p className="product-description">{item.brand}</p>
                                </div>
                                <div className="item-quantity1">
                                    <button
                                        className="quantity-btn1"
                                        onClick={() => decreaseQuantity(item.id)}
                                    >
                                        ▼
                                    </button>
                                    <span className="quantity1">{item.quantity}</span>
                                    <button
                                        className="quantity-btn"
                                        onClick={() => increaseQuantity(item.id)}
                                        disabled={item.quantity >= item.stock}
                                    >
                                        ▲
                                    </button>
                                </div>
                                <div className="item-price1">
                                    <p>{formatPrice(item.price * item.quantity)}</p>
                                </div>
                                <button
                                    className="delete-item1"
                                    onClick={() => deleteItem(item.id)}
                                >
                                    ❌
                                </button>
                            </div>
                        ))
                    ) : (
                        <div className="empty-cart">Your cart is empty</div>
                    )}
                </div>

                <div className="bonus-package1">
                    <div className="bonus-section1">
                        <h2 className="section-title1">
                            <Gift className="gift-icon" size={20} />
                            Bộ phụ kiện tặng kèm
                        </h2>
                        <ul className="bonus-list">
                            {bonusItems.map((item, index) => (
                                <li key={index} className="bonus-item">
                                    <Gift className="item-icon" size={16} />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="warranty-section1">
                        <h2 className="section-title1">Chế độ bảo hành theo mẫu</h2>
                        <ul className="warranty-list">
                            {warrantyItems.map((item, index) => (
                                <li key={index} className="warranty-item">
                                    <div className="check-icon">✓</div>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            <div className="checkout-section1">
                <div className="step-indicator">
                    <div className="step-container">
                        <div className={`step ${step >= 1 ? "active" : ""}`}>
                            <span className="step-number">1</span>
                        </div>
                        <p>Bill</p>
                    </div>
                    <div className={`step-line ${step >= 2 ? "active" : ""}`}></div>
                    <div className="step-container">
                        <div className={`step ${step >= 2 ? "active" : ""}`}>
                            <span className="step-number">2</span>
                        </div>
                        <p>Information</p>
                    </div>
                    <div className={`step-line ${step === 3 ? "active" : ""}`}></div>
                    <div className="step-container">
                        <div className={`step ${step === 3 ? "active" : ""}`}>
                            <span className="step-number">3</span>
                        </div>
                        <p>Payment</p>
                    </div>
                </div>

                <div className="step-content1">
                    {step === 1 && (
                        <div className="bill-step1">
                            <div className="bill-items">
                                {/* Lặp qua các sản phẩm trong giỏ hàng */}
                                {cartItems.map((item) => (
                                    <div key={item.id} className="bill-item">
                                        <img src={item.img} alt={item.name} className="bill-product-image" />
                                        <div className="bill-item-info">
                                            <p>{item.name}</p>
                                            <p>{formatPrice(item.price * item.quantity).toLocaleString()}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="warranty-selection1">
                                <div className="warranty-header">
                                    <div className="warning-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                        </svg>
                                    </div>
                                    <h2>Chọn gói bảo hành</h2>
                                </div>

                                <div className="warranty-options">
                                    {warrantyOptions.map((option) => (
                                        <label
                                            key={option.id}
                                            className={`warranty-option ${selectedWarranty === option.id ? 'selected' : ''}`}
                                            onClick={(e) => {
                                                e.preventDefault(); // Prevent default radio button behavior
                                                handleWarrantyClick(option.id);
                                            }}
                                        >
                                            <input
                                                type="radio"
                                                name="warranty"
                                                value={option.id}
                                                checked={selectedWarranty === option.id}
                                                onChange={() => { }} // Empty onChange to avoid React warning
                                                className="warranty-radio"
                                            />
                                            <div className="warranty-content">
                                                <div className="warranty-name">{option.name}</div>
                                                <div className="warranty-price">
                                                    <span className="current-price">
                                                        +{formatPrice(option.price)}
                                                    </span>
                                                    {option.originalPrice && (
                                                        <span className="original-price">
                                                            {formatPrice(option.originalPrice)}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </div>
                            <div className="bill-footer1">
                                <div className="total">
                                    {/* Tính tổng tiền của giỏ hàng, cộng thêm giá gói bảo hành nếu có */}
                                    <h3>
                                        Total: {formatPrice(
                                            cartItems.reduce((total, item) => total + item.price * item.quantity, 0) +
                                            (selectedWarranty ? warrantyOptions.find(option => option.id === selectedWarranty)?.price : 0)
                                        )}
                                    </h3>
                                </div>
                                <button className="primary-btn" onClick={handleNextStep}>
                                    Continue
                                </button>
                            </div>

                        </div>
                    )}
                    {step === 2 && (
                        <div className="information-step">
                            <div className="form-group1">
                                <label>Name</label>
                                <input type="text" placeholder="Enter name" />
                            </div>
                            <div className="form-group1">
                                <label>Number Phone</label>
                                <input type="text" placeholder="Enter phone number" />
                            </div>
                            <div className="address-group">
                                <div className="form-group">
                                    <label>Tỉnh/Thành phố</label>
                                    <select
                                        value={selectedProvince}
                                        onChange={(e) => setSelectedProvince(e.target.value)}
                                    >
                                        <option value="">Chọn Tỉnh/Thành phố</option>
                                        {provinces.map((province) => (
                                            <option key={province.code} value={province.code}>
                                                {province.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label>Quận/Huyện</label>
                                    <select
                                        value={selectedDistrict}
                                        onChange={(e) => setSelectedDistrict(e.target.value)}
                                        disabled={!selectedProvince}
                                    >
                                        <option value="">Chọn Quận/Huyện</option>
                                        {districts.map((district) => (
                                            <option key={district.code} value={district.code}>
                                                {district.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label>Phường/Xã</label>
                                    <select
                                        value={selectedWard}
                                        onChange={(e) => setSelectedWard(e.target.value)}
                                        disabled={!selectedDistrict}
                                    >
                                        <option value="">Chọn Phường/Xã</option>
                                        {wards.map((ward) => (
                                            <option key={ward.code} value={ward.code}>
                                                {ward.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="form-group1">
                                <label>Notes (House number/Specific address)</label>
                                <textarea placeholder="Enter your detailed address"></textarea>
                            </div>
                            <div className="buttons">
                                <button className="secondary-btn" onClick={handlePrevStep}>Back</button>
                                <button className="primary-btn" onClick={handleNextStep}>
                                    Continue </button>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="payment-step">
                            <div className="payment-methods">
                                <img
                                    src={MoMoImage}
                                    alt="MoMo"
                                    className={`payment-logo ${selected === 'MoMo' ? 'selected' : ''}`}
                                    onClick={() => handleSelect('MoMo')}
                                />
                                <img
                                    src={VNPayImage}
                                    alt="VNPay"
                                    className={`payment-logo ${selected === 'VNPay' ? 'selected' : ''}`}
                                    onClick={() => handleSelect('VNPay')}
                                />
                                <img
                                    src={RuPayImage}
                                    alt="RuPay"
                                    className={`payment-logo ${selected === 'RuPay' ? 'selected' : ''}`}
                                    onClick={() => handleSelect('RuPay')}
                                />
                                <button className="see-all-btn">See all</button>
                            </div>
                            <div className="form-group3">
                                <label>Name on card</label>
                                <input type="text" placeholder="Enter name on card" />
                            </div>
                            <div className="form-group3">
                                <label>Card Number</label>
                                <input type="text" placeholder="Enter card number" />
                            </div>
                            <div className="card-details">
                                <div className="form-group3">
                                    <label>Expiration date</label>
                                    <input type="text" placeholder="Enter MM/YY" />
                                </div>
                                <div className="form-group3">
                                    <label>CVV</label>
                                    <input type="text" placeholder="Enter CVV" />
                                </div>
                            </div>
                            <div className="total-amount3">
                                <h3>
                                    Total: {formatPrice(
                                        cartItems.reduce((total, item) => total + item.price * item.quantity, 0) +
                                        (selectedWarranty ? warrantyOptions.find(option => option.id === selectedWarranty)?.price : 0)
                                    )}
                                </h3>
                            </div>
                            <div className="checkout-footer">
                                <button className="secondary-btn" onClick={handlePrevStep}>Back</button>
                                { }
                                <CheckoutButton label="Checkout" />
                            </div>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default ShoppingPageMini;




