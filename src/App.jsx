import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SidebarManager from "./components/manager/SidebarManager";
import ManagerProfile from "./pages/manager/profile/ManagerProfile";
import ErrorPage from "./pages/error/ErrorPage";
import Category from "./pages/manager/category/Category";
import Product from "./pages/manager/product/Product";

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
  ]);
  return <RouterProvider router={router} />;
}

export default App;
