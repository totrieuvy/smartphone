import { useState, useEffect } from "react";
import { DesktopOutlined, PieChartOutlined, UserOutlined } from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme, Dropdown } from "antd";
import { Link, Outlet, useLocation } from "react-router-dom";
import { DownOutlined } from "@ant-design/icons";
import "./SidebarManager.scss";

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem("Category", "category", <PieChartOutlined />),
  getItem("Products", "products", <DesktopOutlined />),
  getItem("Account", "account", <UserOutlined />, [
    getItem(<Link to="total-account">Total</Link>, "total-account"),
    getItem(<Link to="list-staff">Staff</Link>, "list-staff"),
    getItem(<Link to="list-customer">Customer</Link>, "list-customer"),
  ]),
];

const SidebarManager = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const location = useLocation();
  const breadcrumbItems = location.pathname
    .split("/")
    .filter((path) => path)
    .map((path, index, arr) => ({
      title: <Link to={`/${arr.slice(0, index + 1).join("/")}`}>{path.charAt(0) + path.slice(1)}</Link>,
      key: index,
    }));

  const userMenu = (
    <Menu>
      <Menu.Item key="1">
        <Link to="profile">Profile</Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to="change-password">Change password</Link>
      </Menu.Item>
      <Menu.Item key="3">
        <Link to="logout">Logout</Link>
      </Menu.Item>
    </Menu>
  );

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCollapsed(true); // Collapse the sidebar on small screens
      } else {
        setCollapsed(false); // Expand the sidebar on larger screens
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Call on mount to set the initial state

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline" items={items} />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} className="SidebarManager">
          <div className="SidebarManager__logo">
            <img src="./assets/company.png" alt="logo" />
          </div>
          <Dropdown overlay={userMenu} trigger={["click"]} placement="bottomRight">
            <div className="SidebarManager__user">
              <img src="./assets/user.png" alt="user" />
              <DownOutlined />
            </div>
          </Dropdown>
        </Header>
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }} items={breadcrumbItems} />
          <div
            style={{
              padding: 24,
              minHeight: "100%",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Amazing Tech ©{new Date().getFullYear()} Created by Amazing Tech
        </Footer>
      </Layout>
    </Layout>
  );
};

export default SidebarManager;
