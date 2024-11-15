import React, { useState } from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import SidebarManager from "./components/manager/sidebar/SidebarManager";
import ManagerProfile from "./pages/manager/profile/ManagerProfile";
import ErrorPage from "./pages/error/ErrorPage";
import Category from "./pages/manager/category/Category";
import Product from "./pages/manager/product/Product";
import AdminApp from "./layout/AdminApp/AdminApp";
import Total from "./pages/manager/account/total/Total";
import Customer from "./pages/manager/account/customer/Customer";
import Staff from "./pages/manager/account/staff/Staff";
import AdminDashboard from "./pages/admin/AdminDashboard/AdminDashboard";
import StaffList from "./pages/admin/StaffList/StaffList";
import UserList from "./pages/admin/UserList/UserList";
import AdminAccount from "./pages/admin/AdminAccount/AdminAccount";
import StaffAddForm from "./pages/admin/StaffAddForm/StaffAddForm";
import StaffEditForm from "./pages/admin/StaffEditForm/StaffEditForm";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import HeaderAndFooterTesting from "./pages/Testing-Customer-Header-Footer/index";
import HomePage from "./pages/customer/HomePage/HomePage.jsx";
import ProductDetail from "./pages/customer/HomePageDetail/ProductDetails.jsx";
import CustomerApp from "./layout/CustomerApp/CustomerApp.jsx";
import LoginPage from "./pages/login/login-page";
import ChangePassword from "./pages/manager/change-password/index.jsx";
import SidebarStaff from "./components/staff/sidebar/SidebarStaff.jsx";
import StaffProfile from "./pages/staff/profile/Profile.jsx";
import Feedback from "./pages/staff/feedback/Feedback.jsx";
import Transaction from "./pages/staff/transaction/Transaction.jsx";
import Dashboard from "./pages/staff/dashboard/Dashboard.jsx";
import FeedBackCustomer from "./pages/customer/FeedBack/FeedBack.jsx/";
import Detail from "./pages/staff/feedback/detailProduct/Detail.jsx";
import AdminAccountEdit from "./pages/admin/AdminAccountEdit/AdminAccountEdit.jsx";
import AccountCustomer from "./pages/customer/AccountCustomer/AccountCustomer.jsx";
import ChangePasswordCustomer from "./pages/customer/AccountCustomer/change-password/ChangePassword.jsx";
import ShoppingPage from "./pages/customer/ShoppingPage/ShoppingPage.jsx";
import ShoppingPageAProduct from "./pages/customer/ShoppingPageAProduct/ShoppingPageAProduct.jsx";
import ShoppingPageMini from "./pages/customer/ShoppingPageMini/ShoppingPageMini.jsx";
import ProductDetailCustomer from "./pages/customer/ProductDetailCustomer/ProductDetailCustomer.jsx";

const App = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const router = createBrowserRouter([
        {
            path: "/",
            element: <CustomerApp setSearchQuery={setSearchQuery} />,
            children: [
                {
                    index: true,
                    element: <Navigate to="/category/1" replace />,
                },
                {
                    path: "category/:category",
                    element: <HomePage searchQuery={searchQuery} />,
                },
                {
                    path: "product/:id",
                    element: <ProductDetail />,
                },
                {
                    path: "/feedbacks/:product_id",
                    element: <FeedBackCustomer />,
                },
                {
                    path: "customer/profile",
                    element: <AccountCustomer />,
                },
                {
                    path: "customer/change-password",
                    element: <ChangePasswordCustomer />,
                },
                {
                    path: "shoppingPage",
                    element: <ShoppingPage />,
                },
                {
                    path: "shoppingPageAProduct",
                    element: <ShoppingPageAProduct />,
                },
                {
                    path: "productDetailCustomer",
                    element: <ProductDetailCustomer />,
                },
                {
                    path: "shoppingPageMini",
                    element: <ShoppingPageMini />,
                },
            ],
        },
        {
            path: "*",
            element: <ErrorPage />,
        },
        {
            path: "/manager",
            element: <SidebarManager />,
            children: [
                {
                    path: "profile",
                    element: <ManagerProfile />,
                },
                {
                    path: "category",
                    element: <Category />,
                },
                {
                    path: "products",
                    element: <Product />,
                },
                {
                    path: "total-account",
                    element: <Total />,
                },
                {
                    path: "list-customer",
                    element: <Customer />,
                },
                {
                    path: "list-staff",
                    element: <Staff />,
                },
                {
                    path: "change-password",
                    element: <ChangePassword />,
                },
            ],
        },
        {
            path: "/staff",
            element: <SidebarStaff />,
            children: [
                {
                    path: "profile",
                    element: <StaffProfile />,
                },
                {
                    path: "change-password",
                    element: <ChangePassword />,
                },
                {
                    path: "feedback",
                    element: <Feedback />,
                    children: [
                        {
                            path: "product/:product_id",
                            element: <Detail />,
                        },
                    ],
                },
                {
                    path: "transaction",
                    element: <Transaction />,
                },
                {
                    path: "dashboard",
                    element: <Dashboard />,
                },
            ],
        },
        {
            path: "/admin",
            element: <AdminApp />,
            children: [
                {
                    index: true,
                    element: <AdminDashboard />,
                },
                {
                    path: "dashboard",
                    element: <AdminDashboard />,
                },
                {
                    path: "adminstafflist",
                    element: <StaffList />,
                },
                {
                    path: "addstaff",
                    element: <StaffAddForm />,
                },
                {
                    path: "editstaff/:userId",
                    element: <StaffEditForm />,
                },
                {
                    path: "adminuserlist",
                    element: <UserList />,
                },
                {
                    path: "adminaccount",
                    element: <AdminAccount />,
                },
                {
                    path: "accountedit",
                    element: <AdminAccountEdit />,
                },
            ],
        },
        {
            path: "/test",
            element: <HeaderAndFooterTesting />,
        },
        {
            path: "/login",
            element: <LoginPage />,
        },
    ]);

    return <RouterProvider router={router} />;
};

export default App;
