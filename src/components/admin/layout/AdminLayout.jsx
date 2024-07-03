import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSideBar";
import AdminFooter from "./AdminFooter";

const AdminLayout = () => {
  return (
    <div>
      <div style={{ display: "flex" }}>
        <AdminSidebar />
        <main style={{ width: "100%", minWidth: "1024px" }}>
          <Outlet />
        </main>
      </div>
      <AdminFooter />
    </div>
  );
};

export default AdminLayout;
