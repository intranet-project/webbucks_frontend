import { Route, Routes } from "react-router-dom";
import "./App.css";
import Customer from "./components/customer/Customer";
import Home from "./components/common/Home";
import AdminHome from "./components/admin/AdminHome";
import MenuPage from "./pages/MenuPage";
import Header from "./components/common/Header";
import AdminLayout from "./components/admin/layout/AdminLayout";
import AdminMenu from "./components/admin/AdminMenu";
import AdminOrder from "./components/admin/AdminOrder";
import AdminSales from "./components/admin/AdminSales";
import VoicePage from "./pages/VoicePage";
import EventPage from "./pages/EventPage";
import VoiceList from "./components/customer/Voice/VoiceList";
import VoiceRegistration from "./components/customer/Voice/VoiceRegistration";
import MyPage from "./pages/MyPage";

const App = () => {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/customer" element={<Customer />} />
        <Route path="/customerVoice" element={<VoicePage />} />
        <Route path="/voiceList" element={<VoiceList />} />
        <Route path="/voiceRegistration" element={<VoiceRegistration />} />
        <Route path="/Menu" element={<MenuPage />} />
        <Route path="/event" element={<EventPage />} />

        <Route path="/mypage" element={<MyPage />} />
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminHome />} />
          <Route path="/admin_order" element={<AdminOrder />} />
          <Route path="/admin_menu" element={<AdminMenu />} />
          <Route path="/admin_sales" element={<AdminSales />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
