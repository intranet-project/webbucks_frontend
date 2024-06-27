import { Route, Routes } from "react-router-dom";
import Test from "./components/admin/Test";
import "./App.css";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Test />} />
    </Routes>
  );
};

export default App;
