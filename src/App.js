import { Route, Routes } from "react-router-dom";
import "./App.css";
import Customer from "./components/customer/Customer";
import Home from "./components/common/Home";
import Admin from "./components/admin/Admin";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/customer" element={<Customer />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
};

export default App;
