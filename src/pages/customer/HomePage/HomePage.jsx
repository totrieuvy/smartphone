import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import img1 from "/assets/assetsCustomer/a1.jpg";
import img2 from "/assets/assetsCustomer/a2.jpg";
import img3 from "/assets/assetsCustomer/a3.jpg";
import img4 from "/assets/assetsCustomer/a4.jpg";
import img5 from "/assets/assetsCustomer/a5.jpg";
import img6 from "/assets/assetsCustomer/a6.jpg";
import "./HomePage.css";
import "swiper/css";
import "swiper/css/autoplay";

const slides = [img1, img2, img3, img4, img5, img6];

const HomePage = () => {
  const { category: paramCategory } = useParams();
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://669475034bd61d8314c77f1a.mockapi.io/khanh"
        );
        const data = await response.json();
        const categoryData = data.map((product) => product.category);
        const uniqueCategories = Array.from(new Set(categoryData));
        setCategories(uniqueCategories);

        if (!paramCategory) {
          const firstCategory = uniqueCategories[0];
          navigate(`/category/${firstCategory}`, { replace: true });
        }
      } catch (err) {
        setError("Failed to fetch categories");
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, [paramCategory, navigate]);

  useEffect(() => {
    if (paramCategory) {
      const fetchProducts = async () => {
        setLoadingProducts(true);
        try {
          const response = await fetch(
            "https://669475034bd61d8314c77f1a.mockapi.io/khanh"
          );
          const data = await response.json();
          const categoryProducts = data.filter(
            (product) => product.category === paramCategory
          );
          setProducts(categoryProducts);
        } catch (err) {
          setError("Failed to fetch products");
        } finally {
          setLoadingProducts(false);
        }
      };

      fetchProducts();
    }
  }, [paramCategory]);

  if (loadingCategories) return <p>Loading categories...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <div className="t-title">
        <Swiper
          modules={[Autoplay]}
          loop={true}
          autoplay={{
            delay: 1000,
            disableOnInteraction: false,
            pauseOnMouseEnter: false,
          }}
          spaceBetween={10}
          slidesPerView={5}
          centeredSlides={true}
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <img
                src={slide}
                alt={`Slide ${index + 1}`}
                className="swiper-image"
                onClick={() => navigate(`/products/${index + 1}`)}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div>
        <nav className="navbar">
          <ul>
            {categories.map((category) => (
              <li key={category}>
                <Link to={`/category/${category}`}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div>
        {loadingProducts ? (
          <p>Loading products...</p>
        ) : (
          <div className="product-grid">
            {products.map((product) => (
              <div key={product.id} className="product-card">
                <img src={product.img} alt={product.name} />
                <h2>{product.name}</h2>
                <p>Prices: ${product.price.toFixed(2)}</p>
                <p>Stock: {product.stock}</p>
                <Link to={`/product/${product.id}`}>View Specifications</Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
