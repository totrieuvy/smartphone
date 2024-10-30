import { Link, Outlet } from "react-router-dom";
import "./index.scss";

function HeaderManager() {
  return (
    <div className="HeaderManager">
      <div className="HeaderManager__content">
        <img className="HeaderManager__centered-img" src="./assets/company.png" alt="company" width={130} />

        <div className="HeaderManager__dropdown">
          <img src="./assets/user.png" alt="user" width={50} />
          <div className="HeaderManager__dropdown-menu">
            <Link to="profile">Profile</Link>
            <Link to="settings">Settings</Link>
            <Link htoref="logout">Logout</Link>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default HeaderManager;
