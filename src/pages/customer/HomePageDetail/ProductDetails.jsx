import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import "./ProductDetail.css";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          "https://669475034bd61d8314c77f1a.mockapi.io/khanh"
        );
        const data = await response.json();
        const selectedProduct = data.find((prod) => prod.id === parseInt(id));
        setProduct(selectedProduct);
      } catch (err) {
        setError("Failed to fetch product details");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!product) return <p>Product not found</p>;

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
          {Object.entries(product.specifications)
            .slice(
              0,
              Math.ceil(Object.entries(product.specifications).length / 2)
            )
            .map(([key, value], index) => (
              <div key={key}>
                <span className="key">{capitalizeFirstLetter(key)}:</span>
                <div className="value-container">
                  <strong className="value">{value}</strong>
                </div>
                {index === 0 && (
                  <div className="text">
                    Tìm hiểu kích thước màn hình điện thoại Android
                  </div>
                )}
                {index === 1 && (
                  <div className="text">
                    Camera điện thoại Android có gì đặc biệt?
                  </div>
                )}
                {index === 2 && (
                  <div className="text">
                    Bạn cần RAM bao nhiêu trên điện thoại Android?
                  </div>
                )}
              </div>
            ))}
        </div>

        <div className="specifications-columns">
          {Object.entries(product.specifications)
            .slice(Math.ceil(Object.entries(product.specifications).length / 2))
            .map(([key, value]) => (
              <div key={key}>
                {capitalizeFirstLetter(key)}: <strong>{value}</strong>
              </div>
            ))}
          <div>
            Thiết kế: 165.2 x 71.9 x 6.9 mm
            <br />
            Trọng lượng sản phẩm: 183 g
          </div>
        </div>
      </div>

      <div className="button-link" style={{ display: "flex", gap: "10px" }}>
        <Button variant="outline-primary" className="icon-cart">
          <FaShoppingCart />
        </Button>
        <Button variant="primary" className="buy">
          Mua ngay
        </Button>
        <Button variant="secondary" className="buy-install">
          Mua trả góp
        </Button>
        <Button variant="success" className="feedback">
          Đánh giá
        </Button>
      </div>
    </div>
  );
};

export default ProductDetails;
