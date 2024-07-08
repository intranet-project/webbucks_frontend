import AdminChart from "./AdminChart";
import AdminDashOrder from "./AdminDashOrder";

const AdminHome = () => {
  return (
    <div
      style={{
        minWidth: "1280px",
        display: "flex",
        justifyContent: "space-evenly",
        paddingTop: "20px",
      }}
    >
      <AdminChart />
      <AdminDashOrder />
    </div>
  );
};

export default AdminHome;
