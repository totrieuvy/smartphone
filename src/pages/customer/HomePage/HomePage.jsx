import React, { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Swal from "sweetalert2";
import img1 from "/assets/assetsCustomer/a1.png";
import img2 from "/assets/assetsCustomer/a2.jpg";
import img3 from "/assets/assetsCustomer/a3.jpg";
import img4 from "/assets/assetsCustomer/a4.jpg";
import img5 from "/assets/assetsCustomer/a5.jpg";
import img6 from "/assets/assetsCustomer/a6.jpg";
import img7 from "/assets/assetsCustomer/tt.jpg";
import "./HomePage.css";
import "swiper/css";
import "swiper/css/autoplay";

const slides = [img1, img2, img3, img4, img5, img6];

const HomePage = ({ searchQuery }) => {
  const { category: paramCategory } = useParams();
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [viewedProducts, setViewedProducts] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch categories from MoocAPI
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoryResponse = await fetch(
          "https://6692a166346eeafcf46da14d.mockapi.io/category"
        );
        const categoriesData = await categoryResponse.json();
        setCategories(categoriesData);

        // Set default category for navigation if none is selected
        if (!paramCategory && categoriesData.length > 0) {
          navigate(`/category/${categoriesData[0].id}`, { replace: true });
        }
      } catch (err) {
        setError("Failed to fetch categories");
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, [paramCategory, navigate]);

  // Fetch products based on selected category or search query
  useEffect(() => {
    const fetchProducts = async () => {
      setLoadingProducts(true);
      try {
        const productResponse = await fetch(
          "https://669475034bd61d8314c77f1a.mockapi.io/khanh"
        );
        const productsData = await productResponse.json();
        let filteredProducts = productsData;

        if (searchQuery) {
          filteredProducts = productsData.filter((product) =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase())
          );
        } else if (paramCategory) {
          filteredProducts = productsData.filter(
            (product) => product.category === paramCategory
          );
        }

        if (filteredProducts.length === 0) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "No products found!",
          });
        }

        setProducts(filteredProducts);
      } catch (err) {
        setError("Failed to fetch products");
      } finally {
        setLoadingProducts(false);
      }
    };

    fetchProducts();
  }, [paramCategory, searchQuery]);

  // Load viewed products from local storage on mount
  useEffect(() => {
    const storedViewedProducts =
      JSON.parse(localStorage.getItem("viewedProducts")) || [];
    setViewedProducts(storedViewedProducts);
  }, []);

  // Handle viewing a product
  const handleViewProduct = (product) => {
    const updatedViewedProducts = [
      product,
      ...viewedProducts.filter((p) => p.id !== product.id),
    ].slice(0, 4); // Keep only the 5 most recent products
    setViewedProducts(updatedViewedProducts);
    localStorage.setItem(
      "viewedProducts",
      JSON.stringify(updatedViewedProducts)
    );
    navigate(`/product/${product.id}`);
  };

  // Handle removing a product from viewed products
  const handleRemoveProduct = (productId) => {
    Swal.fire({
      title: "Bạn có muốn xóa không ?",
      text: "Không thể xem lại được nữa!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Có, tôi đồng ý",
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedViewedProducts = viewedProducts.filter(
          (product) => product.id !== productId
        );
        setViewedProducts(updatedViewedProducts);
        localStorage.setItem(
          "viewedProducts",
          JSON.stringify(updatedViewedProducts)
        );
        Swal.fire("Xóa rồi nè!", "Xem sản phẩm khác đi nhé !.", "success");
      }
    });
  };

  // Handle clearing all viewed products
  const handleClearViewedProducts = () => {
    Swal.fire({
      title: "Bạn có muốn xóa không ?",
      text: "Không thể xem lại được nữa!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Có, tôi đồng ý",
    }).then((result) => {
      if (result.isConfirmed) {
        setViewedProducts([]);
        localStorage.setItem("viewedProducts", JSON.stringify([]));
        Swal.fire(
          "Đã xong nè!",
          "Tất cả sản phẩm đã xóa rồi nha ! .",
          "success"
        );
      }
    });
  };

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

      <div className="nav-main">
        <nav className="navbar">
        <img
            src={img1}
            alt="Category Icon"
            style={{
              marginRight: "75px",
              width: "50px",
              height: "50px",
            }}
          />
          <img
            src={img1}
            alt="Category Icon"
            style={{
              marginRight: "25px",
              width: "50px",
              height: "50px",
            }}
          />
          <ul>
            {categories.map((category) => (
              <li key={category.id}>
                <Link to={`/category/${category.id}`}>
                  {category.name.charAt(0).toUpperCase() +
                    category.name.slice(1)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="all-item">
        {loadingProducts ? (
          <p>Loading products...</p>
        ) : (
          <div className="product-grid">
            {products.map((product) => (
              <div key={product.id} className="product-card">
                <img src={product.img} alt={product.name} />
                <h2 className="name">{product.name}</h2>
                <div className="quanlity">{product.quanlity}</div>
                <div className="price">Price: ${product.price.toFixed(2)}</div>
                <p>Stock: {product.stock}</p>
                <button
                  to={`/product/${product.id}`}
                  onClick={() => handleViewProduct(product)}
                  className="button-view"
                >
                  View Specifications
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="all-view">
        {viewedProducts.length > 0 && (
          <div className="viewed-products">
            <button
              className="clear-button"
              onClick={handleClearViewedProducts}
            >
              Xóa lịch sử
            </button>
            <h2>Recently Viewed</h2>

            <div className="product-grids">
              {viewedProducts.map((product) => (
                <div>
                  <div key={product.id} className="product-cards">
                    <div className="product-all">
                      <div className="product-image">
                        <img src={product.img} alt={product.name} />
                      </div>
                      <div className="product-details">
                        <h2>{product.name}</h2>
                        <p>Price: ${product.price.toFixed(2)}</p>
                      </div>
                    </div>

                    <button to={`/product/${product.id}`}>
                      View Specifications
                    </button>
                    <button
                      className="remove-button"
                      onClick={() => handleRemoveProduct(product.id)}
                    >
                      &times;
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <Carousel data-bs-theme="dark">
        <Carousel.Item>
          <img src={img7} alt="1 slide" className="" />
        </Carousel.Item>
        <Carousel.Item>
          <img src={img7} alt="2 slide" className="" />
        </Carousel.Item>
        <Carousel.Item>
          <img src={img7} alt="3 slide" className="" />
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default HomePage;
