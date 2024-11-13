// ProductDetails.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import { Button } from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import { toast } from "react-toastify";
import "./ProductDetail.css";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Initialize useNavigate
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch("https://669475034bd61d8314c77f1a.mockapi.io/khanh");
        const data = await response.json();
        const selectedProduct = data.find(
          (prod) => prod.id === id || prod.id === Number(id) || prod.id.toString() === id.toString()
        );
        setProduct(selectedProduct);
      } catch (err) {
        setError("Failed to fetch product details");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleFeedbackClick = () => {
    navigate(`/feedbacks/${product.id}`);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!product) return <p>Product not found</p>;

  const addToCart = async () => {
    if (product) {
      if (product.stock > 0) {
        try {
          const response = await fetch("https://664f6ea2ec9b4a4a602ec579.mockapi.io/cart", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...product,
              quantity: 1, // Set quantity to 1 when adding to cart
            }),
          });
          if (response.ok) {
            toast.success("Product added to cart successfully!");
          } else {
            toast.error("Failed to add product to cart.");
          }
        } catch (error) {
          toast.error("Error adding product to cart");
        }
      } else {
        toast.warn("This product is out of stock!");
      }
    }
  };

  const handleBuyClick = () => {
    if (product) {
      navigate('/shoppingPage', { state: { product } });
      console.log("check", product);
    }
  };

  const handleBuyInstallClick = () => {
    if (product) {
      navigate('/shoppingPageAProduct', { state: { product } });
    }
  };

  return (
    <div>
      <div className="product-container">
        <div className="image-column">
          <img src={product.img} alt={product.name} />
        </div>
        <div className="info-column">
          <h1>{product.name}</h1>
          <p>Price: ${product.price.toFixed(2)}</p>
          <p>Stock: {product.stock}</p>
        </div>
      </div>

      <div className="specifications-container">
        <div className="specifications-column">
          <h1 className="title">Thông số nổi bật</h1>
          {product.screen_size && (
            <div>
              <span className="key">Kích thước màn hình:</span>
              <strong className="value">{product.screen_size}</strong>
              <div className="text">Trải nghiệm hình ảnh sắc nét hơn với màn hình lớn.</div>
            </div>
          )}
          {product.battery && product.battery !== "0" && (
            <div>
              <span className="key">Dung lượng pin:</span>
              <strong className="value">{product.battery}</strong>
              <div className="text">Pin lâu giúp bạn sử dụng cả ngày dài mà không cần sạc.</div>
            </div>
          )}
          {product.camera && (
            <div>
              <span className="key">Camera:</span>
              <strong className="value">{product.camera}</strong>
              <div className="text">Chụp ảnh chất lượng cao với camera sắc nét.</div>
            </div>
          )}
          {product.processor && (
            <div>
              <span className="key">Bộ xử lý:</span>
              <strong className="value">{product.processor}</strong>
              <div className="text">Hiệu năng mạnh mẽ giúp chạy mượt mà các ứng dụng.</div>
            </div>
          )}
          {product.ram && (
            <div>
              <span className="key">RAM:</span>
              <strong className="value">{product.ram}</strong>
              <div className="text">Đảm bảo khả năng đa nhiệm mượt mà.</div>
            </div>
          )}
          {product.storage && (
            <div>
              <span className="key">Bộ nhớ:</span>
              <strong className="value">{product.storage}</strong>
              <div className="text">Lưu trữ đủ cho tất cả ứng dụng và dữ liệu của bạn.</div>
            </div>
          )}
          {product.operating_system && (
            <div>
              <span className="key">Hệ điều hành:</span>
              <strong className="value">{product.operating_system}</strong>
              <div className="text">Mang đến trải nghiệm người dùng tốt nhất.</div>
            </div>
          )}
          {product.resolution && (
            <div>
              <span className="key">Độ phân giải:</span>
              <strong className="value">{product.resolution}</strong>
              <div className="text">Trải nghiệm hình ảnh sắc nét với độ phân giải cao.</div>
            </div>
          )}
          {product.smart_tv && (
            <div>
              <span className="key">Smart TV:</span>
              <strong className="value">Có</strong>
              <div className="text">Khám phá thế giới giải trí với Smart TV tích hợp.</div>
            </div>
          )}
          {product.refresh_rate && (
            <div>
              <span className="key">Tần số quét:</span>
              <strong className="value">{product.refresh_rate}</strong>
              <div className="text">Trải nghiệm hình ảnh mượt mà hơn với tần số quét cao.</div>
            </div>
          )}
          {product.hdmi_ports > 0 && (
            <div>
              <span className="key">Cổng HDMI:</span>
              <strong className="value">{product.hdmi_ports}</strong>
              <div className="text">Kết nối dễ dàng với các thiết bị khác.</div>
            </div>
          )}
          {product.water_resistant && (
            <div>
              <span className="key">Chống nước:</span>
              <strong className="value">Có</strong>
              <div className="text">An tâm khi sử dụng gần nước.</div>
            </div>
          )}
          {product.heart_rate_monitor && (
            <div>
              <span className="key">Đo nhịp tim:</span>
              <strong className="value">Có</strong>
              <div className="text">Theo dõi sức khỏe của bạn mọi lúc mọi nơi.</div>
            </div>
          )}
          {product.gps && (
            <div>
              <span className="key">GPS:</span>
              <strong className="value">Có</strong>
              <div className="text">Dẫn đường chính xác và tiện lợi.</div>
            </div>
          )}
        </div>
      </div>

      <div className="button-link" style={{ display: "flex", gap: "10px" }}>
        <Button variant="outline-primary" className="icon-cart" onClick={addToCart}>
          <FaShoppingCart />
        </Button>
        <Button variant="primary" className="buy" onClick={handleBuyClick}>
          Mua ngay
        </Button>
        <Button variant="secondary" className="buy-install" onClick={handleBuyInstallClick}>
          Mua trả góp
        </Button>
        <Button variant="success" className="feedback" onClick={handleFeedbackClick}>
          Đánh giá
        </Button>
      </div>
    </div>
  );
};

export default ProductDetails;      
              