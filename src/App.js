import { Route, Routes } from "react-router-dom";
import "./App.css";
import Customer from "./components/customer/Customer";
import Home from "./components/common/Home";
import Admin from "./components/admin/Admin";
import VoiceRegistration from "./components/customer/VoiceRegistration";
import MenuPage from "./pages/MenuPage";
import Header from "./components/common/Header";

const App = () => {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/customer" element={<Customer />} />
        <Route path="/customerVoice" element={<VoiceRegistration />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/Menu" element={<MenuPage />} />
      </Routes>
    </div>
  );
};

export default App;
