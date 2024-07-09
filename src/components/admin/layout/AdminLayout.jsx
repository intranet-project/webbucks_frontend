import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSideBar";
// import AdminFooter from "./AdminFooter";
import "../../../styles/Admin.css";
const AdminLayout = () => {
  return (
    <div>
      <div style={{ display: "flex" }}>
        <AdminSidebar />
        <main className="container-admin" style={{}}>
          <Outlet />
        </main>
      </div>
      {/* <AdminFooter /> */}
    </div>
  );
};

export default AdminLayout;
