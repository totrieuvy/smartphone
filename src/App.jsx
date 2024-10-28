import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SidebarManager from "./components/manager/SidebarManager";

function App() {
  const router = createBrowserRouter([
    {
      path: "/manager",
      element: <SidebarManager />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
