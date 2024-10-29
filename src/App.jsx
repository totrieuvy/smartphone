import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ManagerProfile from "./pages/manager/profile/ManagerProfile";
import ErrorPage from "./pages/error/ErrorPage";
import Category from "./pages/manager/category/Category";
import Product from "./pages/manager/product/Product";
import Total from "./pages/manager/account/total/Total";
import Customer from "./pages/manager/account/customer/Customer";
import Staff from "./pages/manager/account/staff/Staff";
import SidebarManager from "./components/manager/sidebar/SidebarManager";

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
  ]);
  return <RouterProvider router={router} />;
}

export default App;
