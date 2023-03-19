import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./assets/css/style.css";
import Home from "./routes/Home";
import Register from "./routes/Register";
import Login from "./routes/Login";
import Chat from "./routes/Chat";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
