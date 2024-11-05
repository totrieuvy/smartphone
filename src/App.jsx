import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Navigate } from 'react-router-dom';
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
import Login from "./pages/login/Login";
import TermsOfService from "./pages/login/TermsOfService";

import HomePage from "./pages/customer/HomePage/HomePage.jsx";
import ProductDetail from "./pages/customer/HomePageDetail/ProductDetails.jsx";

import CustomerApp from "./layout/CustomerApp/CustomerApp.jsx";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <CustomerApp />,
      children: [
        {
          index: true,
          element: <Navigate to="/category/1" replace />,
        },
        {
          path: "category/:category",
          element: <HomePage />,
        },
        {
          path: "product/:id",
          element: <ProductDetail />,
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
          path: "product",
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
      ],
    },
    {
      path: "/test",
      element: <HeaderAndFooterTesting />,
    },
    {
      path: "/login",
      element: <Login />,
    },

    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/terms",
      element: <TermsOfService />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
