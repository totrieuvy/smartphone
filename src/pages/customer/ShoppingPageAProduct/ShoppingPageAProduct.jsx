import React, { useState, useEffect } from 'react';
import Iphone16 from '/assets/assetsCustomer/1_15.jpg';
import MoMoImage from '/assets/assetsCustomer/images.png';
import VNPayImage from '/assets/assetsCustomer/download.png';
import RuPayImage from '/assets/assetsCustomer/download (1).png';
import "./ShoppingPageAProduct.scss";
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { Gift } from 'lucide-react';
import CheckoutButton from '../../../components/componentCustomer/CheckoutButton/CheckoutButton';

const ShoppingPageAProduct = () => {

    const [selectedWarranty, setSelectedWarranty] = useState(null);
    const location = useLocation();
    const product = location.state?.product; // Access the product data

    if (!product) {
        return <p>No product data found.</p>;
    }
    const [cartItems, setCartItems] = useState([{ ...product, quantity: 1 }]);
    const [downPayment, setDownPayment] = useState(0.1);
    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(price);
    };

    const navigate = useNavigate();

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.price, 0);
    };

    // Calculate paymentAmount based on the down payment percentage
    const paymentAmount = calculateTotal() * downPayment;

    // Update down payment percentage
    const handleDownPaymentChange = (e) => {
        setDownPayment(parseFloat(e.target.value));
    };



    const [step, setStep] = useState(1);
    const [selected, setSelected] = useState(null);

    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);

    const [selectedProvince, setSelectedProvince] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedWard, setSelectedWard] = useState('');
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [notes, setNotes] = useState('');

    const bonusItems = [
        'Kèm sạc, cáp sạc nhanh 33/ 67/ 120/ 160w (tùy mẫu), tai nghe AKG, ốp lưng (tùy mã), dán bảo vệ lưng, cáp lấy sim',
        'Tặng Voucher giảm giá lên đến 450.000 đ khi mua điện thoại, máy tính bảng, laptop',
        'Tặng Voucher giảm 30% khi mua phụ kiện',
        'Tặng gói "bảo hành phụ kiện" (trọn đời)',
        'Miễn phí giao hàng toàn quốc'
    ];

    const warrantyItems = [
        'Bao test 15 ngày 1 đổi 1, đổi màu và đổi dung lượng miễn phí (đối dòng khác khấu trừ 10-15% trong 7 ngày đầu)',
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

    const handleShoppingContinue = () => {
        navigate('/category/1');
    };
    const deleteItem = (id) => {
        setCartItems(cartItems.filter(item => item.id !== id));
        navigate('/category/:1');
    };
    return (
        <div className="shopping-containerPA">
            <div className="cart-section">
                <p
                    className="continue-shopping cursor-pointer flex items-center gap-2 text-gray-600 hover:text-gray-900"
                    onClick={handleShoppingContinue}
                >
                    Shopping Continue
                </p>
                <div className="cart-item-container">
                    {cartItems.map(item => (
                        <div key={item.id} className="cart-item">
                            <img src={item.img} alt={item.name} className="product-image" />
                            <div className="item-info">
                                <h3 className="product-name">{item.name}</h3>
                                <p className="product-description">{item.brand}</p>
                            </div>
                            <div className="item-price">
                                <p>{formatPrice(item.price).toLocaleString()}</p>
                            </div>
                            <button className="delete-item" onClick={() => deleteItem(item.id)}>❌</button>
                        </div>
                    ))}
                </div>
                <div className="bonus-package">
                    <div className="bonus-section">
                        <h2 className="section-title">
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

                    <div className="warranty-section">
                        <h2 className="section-title">Chế độ bảo hành theo mẫu</h2>
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

            <div className="checkout-section">
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

                <div className="step-content">
                    {step === 1 && (
                        <div className="bill-step">
                            <div className="bill-items">
                                {/* Lặp qua các sản phẩm trong giỏ hàng */}
                                {cartItems.map((item) => (
                                    <div key={item.id} className="bill-item">
                                        <img src={item.img} alt={item.name} className="bill-product-image" />
                                        <div className="bill-item-info">
                                            <p>{item.name}</p>
                                            <p>{formatPrice(item.price).toLocaleString()}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="product-financing">
                                <p>Vui lòng đến Showroom để làm thủ tục trả góp</p>
                                <ul className="financing-terms">
                                    <li>✅ Cần Cước Công Dân</li>
                                    <li>✅ Không thẩm định người thân</li>
                                    <li>✅ Không giữ giấy tờ gốc</li>
                                    <li>✅ Không chứng minh thu nhập</li>
                                    <li>✅ Tuổi từ 18 trở lên (có hỗ trợ sinh viên)</li>
                                    <li>✅ Thời gian duyệt: 15 phút lấy máy ngay</li>
                                    <li>✅ Nhiều chương trình khuyến mãi</li>
                                    <li>✅ Không yêu cầu cung cấp thẻ tín dụng</li>
                                    <li>✅ Tất cả giấy tờ ở trên đều phải là giấy tờ gốc</li>
                                </ul>
                                <div className="payment-options">
                                    <label>Chọn số tiền trả trước:</label>
                                    <select onChange={handleDownPaymentChange}>
                                        <option value="0.1">Trả trước 10%</option>
                                        <option value="0.2">Trả trước 20%</option>
                                        <option value="0.3">Trả trước 30%</option>
                                    </select>
                                    <p className="payment-amount"> {formatPrice(paymentAmount)}</p>
                                </div>
                            </div>
                            <div className="bill-footer1">
                                <div className="total">
                                    <h3>Total: {formatPrice(paymentAmount)}</h3>
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
                                <input
                                    type="text"
                                    placeholder="Enter name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="form-group1">
                                <label>Number Phone</label>
                                <input
                                    type="text"
                                    placeholder="Enter phone number"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                />
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
                                <textarea
                                    placeholder="Enter your detailed address"
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                ></textarea>
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
                                <h3>Total: {formatPrice(paymentAmount)}</h3>
                            </div>
                            <div className="checkout-footer2">
                                <button className="secondary-btn" onClick={handlePrevStep}>Back</button>
                                { }
                                <CheckoutButton
                                    label="Checkout"
                                    data={{
                                        cartItems, downPayment, userInfo: {
                                            name,
                                            phoneNumber,
                                            selectedProvince,
                                            selectedDistrict,
                                            selectedWard,
                                            notes
                                        }
                                    }}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};


export default ShoppingPageAProduct;
