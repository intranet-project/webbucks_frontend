import { Route, Routes } from "react-router-dom";
import "./App.css";
import Customer from "./components/customer/Customer";
import Home from "./components/common/Home";
import AdminHome from "./components/admin/AdminHome";
import VoiceRegistration from "./components/customer/VoiceRegistration";
import MenuPage from "./pages/MenuPage";
import Header from "./components/common/Header";
import AdminLayout from "./components/admin/layout/AdminLayout";
import AdminMenu from "./components/admin/AdminMenu";
import AdminOrder from "./components/admin/AdminOrder";
import AdminSales from "./components/admin/AdminSales";

const App = () => {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/customer" element={<Customer />} />
        <Route path="/customerVoice" element={<VoiceRegistration />} />
        <Route path="/Menu" element={<MenuPage />} />
        <Route element={<AdminLayout />}>
          <Route path="/admin_home" element={<AdminHome />} />
          <Route path="/admin_order" element={<AdminOrder />} />
          <Route path="/admin_menu" element={<AdminMenu />} />
          <Route path="/admin_sales" element={<AdminSales />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
