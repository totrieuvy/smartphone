import React from 'react';
import { ArrowUpRight, Info } from 'lucide-react';
import Macbook from '/assets/assetsCustomer/macbook-air-m2-15-inch-8gb-256gb.webp';
import './ProductDetailCustomer.scss';

const ProductDetailCustomer = () => {
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
    sellingBy: 'Nguyen Phuong Nam',
    numberPhone: '0336972360',
    address: 'Bien Hoa - Dong Nai - Trang Dai'
  };

  const paymentDetails = {
    items: 598.86,
    shipping: 40.00,
    discount: 128.00,
    vatTax: 100.00,
    total: 766.86
  };

  return (
    <div className="product-detail-container">
      {/* Products Section */}
      <div className="product-section">
        <h2>Product</h2>
        <div>
          {products.map((product) => (
            <div key={product.id} className="product-item">
              <div className="flex gap-4">
                <img src={Macbook} alt={product.name} />
                <div className="product-item-details">
                  <h3>{product.name}</h3>
                  <p>{product.specs}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Info className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-green-500">Estimated delivery: {product.estimatedDelivery}</span>
                  </div>
                </div>
              </div>
              <div className="product-item-price">
                <p>${product.price.toFixed(2)}</p>
                <p className="text-sm text-gray-500">Qty: {product.quantity}</p>
                <button className="product-item-button">
                  View Product
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Shipping Details Section */}
      <div className="shipping-section">
        <h2>Shipping Details</h2>
        <div className="shipping-details-grid">
          <div>
            <p>Date Shipping</p>
            <p className="font-medium">{shippingDetails.dateShipping}</p>
          </div>
          <div>
            <p>Shipping</p>
            <p className="font-medium">{shippingDetails.shipping}</p>
          </div>
          <div>
            <p>Selling by</p>
            <p className="font-medium">{shippingDetails.sellingBy}</p>
          </div>
          <div>
            <p>Number phone</p>
            <p className="font-medium">{shippingDetails.numberPhone}</p>
          </div>
          <div className="full-width">
            <p>Address</p>
            <p className="font-medium">{shippingDetails.address}</p>
          </div>
        </div>
      </div>

      {/* Payment Details Section */}
      <div className="payment-section">
        <h2>Payment Details</h2>
        <div className="payment-details">
          <div className="payment-row">
            <span>Items (3)</span>
            <span>${paymentDetails.items}</span>
          </div>
          <div className="payment-row">
            <span>Shipping</span>
            <span>${paymentDetails.shipping.toFixed(2)}</span>
          </div>
          <div className="payment-row">
            <span>Discount</span>
            <span className="text-green-500">-${paymentDetails.discount.toFixed(2)}</span>
          </div>
          <div className="payment-row">
            <span>VAT tax</span>
            <span>${paymentDetails.vatTax.toFixed(2)}</span>
          </div>
          <div className="payment-total">
            <div className="flex justify-between">
              <span className="font-semibold">Total Price</span>
              <span className="font-semibold">${paymentDetails.total}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Button */}
      <div>
        <button className="payment-button">Payment</button>
      </div>
    </div>
  );
}

export default ProductDetailCustomer;
