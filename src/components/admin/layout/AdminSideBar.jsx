import React from "react";
import { Link } from "react-router-dom";
import "../../../styles/AdminSidebar.css";

const AdminSideBar = () => {
  return (
    <div className="sidebar">
      {/*홈 화면 로고 자리 */}
      <div className="logo">
        <Link to="/admin_home" className="header__logo">
          <img
            src={process.env.PUBLIC_URL + "/logo.png"}
            alt="Logo"
            className="header__logoImage"
          />
        </Link>
      </div>

      {/*사이드바 네비게이터 자리 */}
      <nav className="sidebar-nav">
        <ul>
          <li>
            <Link to="/admin_home">Home</Link>
          </li>
          <li>
            <Link to="/admin_order">오더관리</Link>
          </li>
          <li>
            <Link to="/admin_menu">메뉴관리</Link>
          </li>
          <li>
            <Link to="/admin_sales">매출 현황</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default AdminSideBar;
