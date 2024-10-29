import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SidebarManager from "./components/manager/SidebarManager";
import "bootstrap-icons/font/bootstrap-icons.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import AdminDashboardPage from "./pages/admin/AdminDashboardPage/AdminDashboardPage";
import ManagerProfile from "./pages/manager/profile/ManagerProfile";
import ErrorPage from "./pages/error/ErrorPage";
import Category from "./pages/manager/category/Category";
import Product from "./pages/manager/product/Product";
import AdminApp from './layout/AdminApp/AdminApp'
import HeaderAndFooterTesting from './pages/Testing-Customer-Header-Footer/index';

function App() {
  const router = createBrowserRouter([
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
      ],
    },
    {
      path: "/admin",
      element: <AdminApp />,     
      
    },
    {
      path: "/test",
      element: <HeaderAndFooterTesting />,     
      
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
