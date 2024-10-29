import { useState, useEffect } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import {
  ProductOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  DoubleRightOutlined,
  DoubleLeftOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { Dropdown, Menu } from "antd";
import "./SidebarManager.scss";

function SidebarManager() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);

  const accountMenu = (
    <Menu>
      <Menu.Item key="total">
        <NavLink to="total-account">Total</NavLink>
      </Menu.Item>
      <Menu.Item key="customer">
        <NavLink to="list-customer">Customer</NavLink>
      </Menu.Item>
      <Menu.Item key="staff">
        <NavLink to="list-staff">Staff</NavLink>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="SidebarManager">
      <div className="SidebarManager__menuButton" onClick={toggleSidebar}>
        {isSidebarOpen ? <DoubleLeftOutlined className="menu-icon" /> : <DoubleRightOutlined className="menu-icon" />}
      </div>

      <div className={`SidebarManager__left ${isSidebarOpen ? "open" : ""}`}>
        <ul className="SidebarManager__menu">
          <li>
            <NavLink
              to="category"
              className={({ isActive }) =>
                isActive ? "SidebarManager__menu__item active-item" : "SidebarManager__menu__item"
              }
            >
              <ProductOutlined className="icon" />
              <span className="menu-text">Category</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="product"
              className={({ isActive }) =>
                isActive ? "SidebarManager__menu__item active-item" : "SidebarManager__menu__item"
              }
            >
              <ShoppingCartOutlined className="icon" />
              <span className="menu-text">Products</span>
            </NavLink>
          </li>
          <li>
            <Dropdown overlay={accountMenu} trigger={["click"]}>
              <div className="SidebarManager__menu__item dropdown-toggle">
                <UserOutlined className="icon" />
                <span className="menu-text">Account</span>
                <DownOutlined className="icon icon2" />
              </div>
            </Dropdown>
          </li>
        </ul>
      </div>
      <div className="SidebarManager__right">{<Outlet />}</div>
    </div>
  );
}

export default SidebarManager;
