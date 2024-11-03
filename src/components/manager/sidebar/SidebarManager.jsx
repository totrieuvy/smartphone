import { useState, useEffect } from "react";
import { DesktopOutlined, PieChartOutlined, UserOutlined, DownOutlined } from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, Dropdown, theme } from "antd";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import "./SidebarManager.scss";

const { Header, Content, Footer, Sider } = Layout;

function SidebarManager() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const items = [
    {
      key: "category",
      icon: <PieChartOutlined />,
      label: "Category",
    },
    {
      key: "products",
      icon: <DesktopOutlined />,
      label: "Products",
    },
    {
      key: "account",
      icon: <UserOutlined />,
      label: "Account",
      children: [
        {
          key: "total-account",
          label: "Total",
        },
        {
          key: "list-staff",
          label: "Staff",
        },
        {
          key: "list-customer",
          label: "Customer",
        },
      ],
    },
  ];

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
        <Link to="profile" className="link__manager">
          Profile
        </Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to="change-password" className="link__manager">
          Change password
        </Link>
      </Menu.Item>
      <Menu.Item key="3">
        <Link to="logout" className="link__manager">
          Logout
        </Link>
      </Menu.Item>
    </Menu>
  );

  useEffect(() => {
    const handleResize = () => {
      setCollapsed(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const onMenuClick = ({ key }) => {
    navigate(`/manager/${key}`);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname.split("/").pop()]}
          items={items}
          onClick={onMenuClick}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} className="SidebarManager">
          <div className="SidebarManager__logo">
            <img src="https://amazingtech.vn/Content/amazingtech/assets/img/logo-color.png" alt="logo" />
          </div>
          <Dropdown overlay={userMenu} trigger={["click"]} placement="bottomRight">
            <div className="SidebarManager__user">
              <img
                src="https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png"
                alt="user"
              />
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
}

export default SidebarManager;
