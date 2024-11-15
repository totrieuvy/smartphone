import React, { useEffect, useState } from 'react';
import { ArrowUpRight, Info } from 'lucide-react';
import './ProductDetailCustomer.scss';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const ProductDetailCustomer = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const data = location.state?.data;
  const selectedWarranty = data?.selectedWarranty;
  const downPayment = data?.downPayment;
  const userInfo = data?.userInfo;
  const currentDate = new Date().toLocaleDateString('en-GB');
  const [paymentStatus, setPaymentStatus] = useState(null);

  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 2); // Thêm 5 ngày
  const formattedDeliveryDate = deliveryDate.toLocaleDateString('en-GB');

  const [provinceName, setProvinceName] = useState('');
  const [districtName, setDistrictName] = useState('');
  const [wardName, setWardName] = useState('');

  const { selectedProvince, selectedDistrict, selectedWard, address, notes } = userInfo || {};

  useEffect(() => {
    // Fetch Province Name
    const fetchProvinceName = async () => {
      if (selectedProvince) {
        try {
          const response = await fetch(`https://provinces.open-api.vn/api/p/${selectedProvince}`);
          const data = await response.json();
          setProvinceName(data.name);
        } catch (error) {
          console.error('Error fetching province name:', error);
        }
      }
    };

    // Fetch District Name
    const fetchDistrictName = async () => {
      if (selectedDistrict) {
        try {
          const response = await fetch(`https://provinces.open-api.vn/api/d/${selectedDistrict}`);
          const data = await response.json();
          setDistrictName(data.name);
        } catch (error) {
          console.error('Error fetching district name:', error);
        }
      }
    };

    // Fetch Ward Name
    const fetchWardName = async () => {
      if (selectedWard) {
        try {
          const response = await fetch(`https://provinces.open-api.vn/api/w/${selectedWard}`);
          const data = await response.json();
          setWardName(data.name);
        } catch (error) {
          console.error('Error fetching ward name:', error);
        }
      }
    };

    // Call each fetch function
    fetchProvinceName();
    fetchDistrictName();
    fetchWardName();
  }, [selectedProvince, selectedDistrict, selectedWard]);


  if (!data) {
    return <p>No data provided</p>;
  }
  const products = [
    {
      id: 1,
      name: 'iPad Pro 12.9"',
      specs: '32GB / 1TB Space Gray',
      estimatedDelivery: 'May 16, 2022',
      price: 2599.00,
      quantity: 2,
      image: '/api/placeholder/80/80'
    },
    {
      id: 2,
      name: 'AirPods Max',
      specs: '32GB / 1TB Space Gray',
      estimatedDelivery: 'May 16, 2022',
      price: 2599.00,
      quantity: 2,
      image: '/api/placeholder/80/80'
    },
    {
      id: 3,
      name: 'MacBook Pro 14"',
      specs: '32GB / 1TB Space Gray',
      estimatedDelivery: 'May 16, 2022',
      price: 2599.00,
      quantity: 2,
      image: '/api/placeholder/80/80'
    }
  ];

  const shippingDetails = {
    dateShipping: 'January 16, 2020',
    shipping: 'Viet Nam',
  };

  const paymentDetails = {
    shipping: 40.00,
    vatTax: 100.00,
    total: 766.86
  };

  const handlePayment = {

  };

  return (
    <div className="product-detail-container">
      {/* Products Section */}
      <div className="product-section">
        <div>
          {/* Kiểm tra nếu có data.cartItems */}
          {data.cartItems && data.cartItems.length > 0 ? (
            data.cartItems.map(product => (
              <div key={product.id} className="product-item">
                <div className="product-item-image">
                  <img src={product.img} alt={product.name} className="product-item-img" />
                </div>
                <div className="product-item-details">
                  <h3 className="product-item-name">{product.name}</h3>
                  <h3 className="product-item-name">{product.brand}</h3>
                  <div className="product-item-delivery">
                    <Info className="icon" />
                    <span className="estimated-delivery">Estimated delivery: {currentDate}</span>
                  </div>
                </div>
                <div className="product-item-price-actions">
                  <div className="product-price-info">
                    <p className="product-price">${product.price.toFixed(2)}</p>
                    <p className="product-quantity">Quantity: {product.quantity}</p>
                    <button className="view-product-button" onClick={() => navigate(`/product/${product.id}`)}>
                      <FontAwesomeIcon icon={faEye} />
                      View Product
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : data.CartItems && data.CartItems.length > 0 ? (
            data.CartItems.map(product => (
              <div key={product.id} className="product-item">
                <div className="product-item-image">
                  <img src={product.img} alt={product.name} className="product-item-img" />
                </div>
                <div className="product-item-details">
                  <h3 className="product-item-name">{product.name}</h3>
                  <h3 className="product-item-name">{product.brand}</h3>
                  <div className="product-item-delivery">
                    <Info className="icon" />
                    <span className="estimated-delivery">Estimated delivery: {currentDate}</span>
                  </div>
                </div>
                <div className="product-item-price-actions">
                  <div className="product-price-info">
                    <p className="product-price">${product.price.toFixed(2)}</p>
                    <p className="product-quantity">Quantity: {product.quantity}</p>
                    <button className="view-product-button" onClick={() => navigate(`/product/${product.product_id}`)}>
                      <FontAwesomeIcon icon={faEye} />
                      View Product
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-products">
              <span>No products available in the cart.</span>
            </div>
          )}
        </div>
      </div>


      {/* Shipping Details Section */}
      <div className="shipping-section">
        <h2>Shipping Details</h2>
        <div className="shipping-details-grid">
          <div>
            <p>Date Shipping</p>
            <p className="font-medium">{formattedDeliveryDate}</p>
          </div>
          <div>
            <p>Shipping</p>
            <p className="font-medium">{shippingDetails.shipping}</p>
          </div>
          <div>
            <p>Selling by</p>
            <p>{userInfo?.name}</p>
          </div>
          <div>
            <p>Number phone</p>
            <p>{userInfo?.phoneNumber}</p>
          </div>

          <div>
            <p>Address</p>
            <p className="font-medium">
              {provinceName}, {districtName}, {wardName}
            </p>
          </div>
          <div>
            <p>Note</p>
            <p className="font-medium">{userInfo?.notes}</p>
          </div>

        </div>
      </div>

      {/* Payment Details Section */}
      <div className="payment-section">
        <h2>Payment Details</h2>
        <div className="payment-details">
          {/* Kiểm tra xem data.cartItems hay data.CartItems có tồn tại và có phần tử không */}
          {data.cartItems && data.cartItems.length > 0 ? (
            data.cartItems.map(item => (
              <div key={item.id} className="payment-row">
                <span>{item.name} (x{item.quantity})</span>
                <span>
                  ${((item.price * item.quantity) * (downPayment > 0 ? downPayment : 1)).toFixed(2)}
                </span>
              </div>
            ))
          ) : data.CartItems && data.CartItems.length > 0 ? (
            data.CartItems.map(item => (
              <div key={item.id} className="payment-row">
                <span>{item.name} (x{item.quantity})</span>
                <span>
                  ${((item.price * item.quantity) * (downPayment > 0 ? downPayment : 1)).toFixed(2)}
                </span>
              </div>
            ))
          ) : (
            <div className="payment-row">
              <span>No items found in the cart.</span>
            </div>
          )}

          <div className="payment-row">
            <span>Trả trước</span>
            <span>{downPayment || 0}%</span>
          </div>

          <div className="payment-row">
            <span>Shipping</span>
            <span>${paymentDetails.shipping.toFixed(2)}</span>
          </div>

          {selectedWarranty?.name && selectedWarranty?.price && (
            <div className="payment-row">
              <span>{selectedWarranty?.name}</span>
              <span className="text-green-500">${selectedWarranty?.price.toFixed(2)}</span>
            </div>
          )}

          <div className="payment-row">
            <span>VAT tax</span>
            <span>${paymentDetails.vatTax.toFixed(2)}</span>
          </div>

          {/* Tính tổng giá trị thanh toán */}
          <div className="payment-total">
            <div className="flex justify-between">
              <span className="font-semibold">Total Price :</span>
              <span className="font-semibold">
                ${(
                  // Tính tổng giá giỏ hàng từ cartItems hoặc CartItems
                  ((data.cartItems || data.CartItems || []).reduce((total, item) => total + item.price * item.quantity, 0) * (downPayment > 0 ? downPayment : 1)) +
                  paymentDetails.shipping +
                  (selectedWarranty?.price || 0) +
                  paymentDetails.vatTax
                ).toFixed(2)}
              </span>
            </div>
          </div>
        </div>

      </div>
      {/* Payment Button */}
      <div>
        <button className="payment-button" onClick={handlePayment}>
          Payment
        </button>
        {paymentStatus && <div>{paymentStatus}</div>}
      </div>
    </div>
  );
}

export default ProductDetailCustomer;






