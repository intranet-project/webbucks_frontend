import { Outlet } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSideBar";
import AdminFooter from "./AdminFooter";

const AdminLayout = () => {
  return (
    <div>
      <div style={{ display: "flex" }}>
        <AdminSidebar />
        <main>
          <Outlet />
        </main>
      </div>
      <AdminFooter />
    </div>
  );
};

export default AdminLayout;
