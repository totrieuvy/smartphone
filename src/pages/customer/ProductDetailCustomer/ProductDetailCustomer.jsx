import React, { useEffect, useState } from "react";
import { ArrowUpRight, Info } from "lucide-react";
import "./ProductDetailCustomer.scss";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const ProductDetailCustomer = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const data = location.state?.data;
  const selectedWarranty = data?.selectedWarranty;
  const downPayment = data?.downPayment;
  const userInfo = data?.userInfo;
  const currentDate = new Date().toLocaleDateString("en-GB");
  const [isProcessing, setIsProcessing] = useState(false);

  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 2); // Thêm 5 ngày
  const formattedDeliveryDate = deliveryDate.toLocaleDateString("en-GB");

  const [provinceName, setProvinceName] = useState("");
  const [districtName, setDistrictName] = useState("");
  const [wardName, setWardName] = useState("");

  const { selectedProvince, selectedDistrict, selectedWard, address, notes } =
    userInfo || {};

  useEffect(() => {
    const fetchProvinceName = async () => {
      if (selectedProvince) {
        try {
          const response = await fetch(
            `https://provinces.open-api.vn/api/p/${selectedProvince}`
          );
          const data = await response.json();
          setProvinceName(data.name);
        } catch (error) {
          console.error("Error fetching province name:", error);
        }
      }
    };

    const fetchDistrictName = async () => {
      if (selectedDistrict) {
        try {
          const response = await fetch(
            `https://provinces.open-api.vn/api/d/${selectedDistrict}`
          );
          const data = await response.json();
          setDistrictName(data.name);
        } catch (error) {
          console.error("Error fetching district name:", error);
        }
      }
    };

    const fetchWardName = async () => {
      if (selectedWard) {
        try {
          const response = await fetch(
            `https://provinces.open-api.vn/api/w/${selectedWard}`
          );
          const data = await response.json();
          setWardName(data.name);
        } catch (error) {
          console.error("Error fetching ward name:", error);
        }
      }
    };

    fetchProvinceName();
    fetchDistrictName();
    fetchWardName();
  }, [selectedProvince, selectedDistrict, selectedWard]);

  if (!data) {
    return <p>No data provided</p>;
  }

  const shippingDetails = {
    shipping: "Viet Nam",
  };

  const paymentDetails = {
    shipping: 40.0,
    vatTax: 100.0,
    total: 766.86,
  };

  const handlePayment = async () => {
    try {
      setIsProcessing(true);

      const cartItems = data.cartItems || data.CartItems;

      if (!cartItems || cartItems.length === 0) {
        throw new Error("No items in cart");
      }

      const productIds = cartItems.map((item) => item.product_id || item.id);
      const response = await fetch(
        `https://669475034bd61d8314c77f1a.mockapi.io/khanh?id=${productIds.join(
          ","
        )}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch products from API");
      }

      const allProducts = await response.json();

      const updatePromises = cartItems.map(async (cartItem) => {
        const productToUpdate = allProducts.find(
          (apiProduct) => apiProduct.id === (cartItem.product_id || cartItem.id)
        );

        if (!productToUpdate) {
          throw new Error(
            `Product with ID ${cartItem.product_id || cartItem.id} not found`
          );
        }

        const newStock = productToUpdate.stock - cartItem.quantity;

        if (newStock < 0) {
          throw new Error(
            `Not enough stock for product ${productToUpdate.name}. Available: ${productToUpdate.stock}`
          );
        }

        const updatedProduct = {
          id: productToUpdate.id,
          stock: newStock,
        };

        console.log("Sending update request...", updatedProduct);

        const updateResponse = await fetch(
          `https://669475034bd61d8314c77f1a.mockapi.io/khanh/${updatedProduct.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedProduct),
          }
        );

        if (!updateResponse.ok) {
          const errorText = await updateResponse.text();
          console.error("Update response error:", errorText);
          throw new Error(`Failed to update product ${productToUpdate.name}`);
        }

        console.log("Update successful:", updatedProduct);
        return updatedProduct;
      });

      await Promise.all(updatePromises);

      console.log("All updates completed successfully");
      alert("Payment successful! Stock has been updated.");
      navigate("/");
    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment failed: " + error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="product-detail-container">
      <div className="product-section">
        <div>
          {data.cartItems && data.cartItems.length > 0 ? (
            data.cartItems.map((product) => (
              <div key={product.id} className="product-item">
                <div className="product-item-image">
                  <img
                    src={product.img}
                    alt={product.name}
                    className="product-item-img"
                  />
                </div>
                <div className="product-item-details">
                  <h3 className="product-item-name">{product.name}</h3>
                  <h3 className="product-item-name">{product.brand}</h3>
                  <div className="product-item-delivery">
                    <Info className="icon" />
                    <span className="estimated-delivery">
                      Estimated delivery: {currentDate}
                    </span>
                  </div>
                </div>
                <div className="product-item-price-actions">
                  <div className="product-price-info">
                    <p className="product-price">${product.price.toFixed(2)}</p>
                    <p className="product-quantity">
                      Quantity: {product.quantity}
                    </p>
                    <button
                      className="view-product-button"
                      onClick={() => navigate(`/product/${product.id}`)}
                    >
                      <FontAwesomeIcon icon={faEye} />
                      View Product
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : data.CartItems && data.CartItems.length > 0 ? (
            data.CartItems.map((product) => (
              <div key={product.id} className="product-item">
                <div className="product-item-image">
                  <img
                    src={product.img}
                    alt={product.name}
                    className="product-item-img"
                  />
                </div>
                <div className="product-item-details">
                  <h3 className="product-item-name">{product.name}</h3>
                  <h3 className="product-item-name">{product.brand}</h3>
                  <div className="product-item-delivery">
                    <Info className="icon" />
                    <span className="estimated-delivery">
                      Estimated delivery: {currentDate}
                    </span>
                  </div>
                </div>
                <div className="product-item-price-actions">
                  <div className="product-price-info">
                    <p className="product-price">${product.price.toFixed(2)}</p>
                    <p className="product-quantity">
                      Quantity: {product.quantity}
                    </p>
                    <button
                      className="view-product-button"
                      onClick={() => navigate(`/product/${product.product_id}`)}
                    >
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

      <div className="payment-section">
        <h2>Payment Details</h2>
        <div className="payment-details">
          {data.cartItems && data.cartItems.length > 0 ? (
            data.cartItems.map((item) => (
              <div key={item.id} className="payment-row">
                <span>
                  {item.name} (x{item.quantity})
                </span>
                <span>
                  $
                  {(
                    item.price *
                    item.quantity *
                    (downPayment > 0 ? downPayment : 1)
                  ).toFixed(2)}
                </span>
              </div>
            ))
          ) : data.CartItems && data.CartItems.length > 0 ? (
            data.CartItems.map((item) => (
              <div key={item.id} className="payment-row">
                <span>
                  {item.name} (x{item.quantity})
                </span>
                <span>
                  $
                  {(
                    item.price *
                    item.quantity *
                    (downPayment > 0 ? downPayment : 1)
                  ).toFixed(2)}
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
              <span className="text-green-500">
                ${selectedWarranty?.price.toFixed(2)}
              </span>
            </div>
          )}

          <div className="payment-row">
            <span>VAT tax</span>
            <span>${paymentDetails.vatTax.toFixed(2)}</span>
          </div>

          <div className="payment-total">
            <div className="flex justify-between">
              <span className="font-semibold">Total Price :</span>
              <span className="font-semibold">
                $
                {(
                  (data.cartItems || data.CartItems || []).reduce(
                    (total, item) => total + item.price * item.quantity,
                    0
                  ) *
                    (downPayment > 0 ? downPayment : 1) +
                  paymentDetails.shipping +
                  (selectedWarranty?.price || 0) +
                  paymentDetails.vatTax
                ).toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div>
        <button
          className={`payment-button ${isProcessing ? "disabled" : ""}`}
          onClick={handlePayment}
          disabled={isProcessing}
        >
          {isProcessing ? "Processing..." : "Payment"}
        </button>
      </div>
    </div>
  );
};

export default ProductDetailCustomer;
