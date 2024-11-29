
import React, { useState, useEffect } from 'react';
import './CartModal.scss';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Swal from "sweetalert2";

const CartModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectAll, setSelectAll] = useState(false);



    // Fetch cart items
    useEffect(() => {
        axios.get('https://664f6ea2ec9b4a4a602ec579.mockapi.io/cart')
            .then(response => {
                setProducts(response.data); // Set the products from the cart API
            })
            .catch(error => {
                console.error("There was an error fetching the cart data!", error);
            });
    }, []);

    // // Fetch categories
    // useEffect(() => {
    //     axios.get('https://6692a166346eeafcf46da14d.mockapi.io/category')
    //         .then(response => {
    //             setCategories(response.data); // Set the categories from the category API
    //         })
    //         .catch(error => {
    //             console.error("There was an error fetching the category data!", error);
    //         });
    // }, []);

    // // Merge cart items with category data
    // // const mergedProducts = products.map(product => {
    // //     const category = categories.find(cat => cat.id === product.id); // Match by categoryId
    // //     return {
    // //         ...product,
    // //         categoryName: category ? category.name : 'Unknown Category', // Add category name if available
    // //     };
    // // });

    const handleQuantityChange = async (productId, newQuantity) => {
        if (newQuantity < 1) return;

        // Cập nhật state trong React trước
        setProducts(products.map(product =>
            product.id === productId
                ? { ...product, quantity: newQuantity }
                : product
        ));

        // Gửi yêu cầu cập nhật tới API
        try {
            const response = await fetch(`https://664f6ea2ec9b4a4a602ec579.mockapi.io/cart/${productId}`, {
                method: 'PUT', // hoặc 'PATCH' tùy theo API của bạn
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ quantity: newQuantity }),
            });

            if (!response.ok) {
                throw new Error('Failed to update quantity');
            }
            console.log('Quantity updated successfully');
        } catch (error) {
            console.error('Error updating quantity:', error);
        }
    };


    const handleSelectAll = (e) => {
        const isChecked = e.target.checked;
        setSelectAll(isChecked);

        setProducts(products.map(product => ({
            ...product,
            selected: isChecked
        })));
    };


    const handleSelectProduct = (productId) => {
        const updatedProducts = products.map(product =>
            product.id === productId
                ? { ...product, selected: !product.selected }
                : product
        );
        setProducts(updatedProducts);
        setSelectAll(updatedProducts.every(product => product.selected));
        console.log("check product select", updatedProducts);
    };




const handlePayment = () => {
  const user = localStorage.getItem("account"); // Kiểm tra thông tin người dùng trong localStorage

  if (!user) {
    // Hiển thị thông báo bằng Swal.fire với thời gian tự động đóng
    Swal.fire({
      title: "Login Required",
      text: "Please log in to proceed with payment.",
      icon: "warning",
      confirmButtonText: "Login",
      timer: 5000, // Hiển thị trong 5 giây
      timerProgressBar: true, // Hiển thị thanh tiến trình
    }).then((result) => {
      if (result.isConfirmed || result.dismiss === Swal.DismissReason.timer) {
        // Điều hướng đến trang đăng nhập và lưu URL hiện tại vào state
        navigate("/login", { state: { from: "/shoppingPageMini" } });
      }
    });
  } else {
    // Nếu người dùng đã đăng nhập, thực hiện các thao tác thanh toán
    const selectedProducts = products.filter((product) => product.selected);
    onClose(); // Đóng modal nếu cần
    // Truyền state vào URL khi điều hướng
    navigate("/shoppingPageMini", { state: { selectedProducts } });
    console.log("check", selectedProducts);
  }
};

    
    



    const calculateTotal = () => {
        return products
            .filter(product => product.selected)
            .reduce((total, product) => total + (product.price * product.quantity), 0);
    };

    const deleteItem = (productId) => {
        axios.delete(`https://664f6ea2ec9b4a4a602ec579.mockapi.io/cart/${productId}`)
            .then(() => {
                setProducts(prevProducts => prevProducts.filter(product => product.id !== productId));
            })
            .catch(error => {
                console.error("There was an error deleting the product!", error);
            });
    };



    return (
        <>
            <div className="modal-backdrop" onClick={onClose} />
            <div className="cart">
                <header className="cart__header">
                    <h1 className="cart__title">Shopping Cart Mini</h1>
                </header>
                <div className="cart__select-all">
                    <label>
                        <input
                            type="checkbox"
                            checked={selectAll}
                            onChange={handleSelectAll}
                        />
                        <span>Select All</span>
                    </label>
                </div>
                <div className="cart__items">
                    {products.map(product => (
                        <div key={products.id} className="cart-item">
                            <div className="cart-item__content">
                                <div className="cart-item__image">
                                    <img src={product.img} alt={product.name} />
                                </div>
                                <div className="cart-item__info">
                                    <div className="cart-item__top">
                                        <h3 className="cart-item__title">{product.name}</h3>
                                        <div className="cart-item__price">${product.price}</div>
                                    </div>
                                    <p className="cart-item__specs">{product.brand}</p>
                                    <p className="cart-item__specs">{product.categoryName}</p>
                                    <div className="cart-item__controls">
                                        <div className="quantity-control">
                                            <button
                                                className="quantity-btn"
                                                onClick={() => handleQuantityChange(product.id, product.quantity - 1)}
                                                disabled={product.quantity <= 1}
                                            >
                                                -
                                            </button>
                                            <input
                                                type="text"
                                                value={product.quantity}
                                                readOnly
                                                className="quantity-input"
                                            />
                                            <button
                                                className="quantity-btn"
                                                onClick={() => handleQuantityChange(product.id, product.quantity + 1)}
                                                disabled={product.quantity >= product.stock}
                                            >
                                                +
                                            </button>
                                        </div>
                                        <label className="select-device">
                                            <input
                                                type="checkbox"
                                                checked={product.selected}
                                                onChange={() => handleSelectProduct(product.id)}
                                            />
                                            <span>Select device</span>
                                        </label>
                                    </div>
                                </div>
                                <button className="delete-item" onClick={() => deleteItem(product.id)}>❌</button>
                            </div>
                        </div>
                    ))}
                </div>
                <footer className="cart__footer">
                    <div className="cart__total">
                        <span>Total Bill</span>
                        <span className="total-amount">${calculateTotal()}</span>
                    </div>
                    <button className="payment-btn" onClick={handlePayment}>Payment</button>
                </footer>
            </div>
        </>
    );
};

export default CartModal;
