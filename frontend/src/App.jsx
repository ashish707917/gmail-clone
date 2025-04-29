import './App.css';
import Inbox from './Inbox';
import Body from "./Body";
import Mail from "./Mail";
import SendEmail from "./Sendemail";
import Signup from "./Signup";
import Login from "./Login";
import { Toaster } from 'react-hot-toast';
import { useSelector } from "react-redux";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from 'react';

function App() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  const open = useSelector((state) => state.app.open);

  return (
    <div className='bg-[#F6F8FC] h-screen overflow-hidden'>
      <Routes>
        <Route path="/" element={<Body />}>
          <Route index element={<Inbox />} />
          <Route path="mail/:id" element={<Mail />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>

      {/* Compose Email Box */}
      <div className="absolute w-[30%] bottom-0 right-20 z-10">
        {open && <SendEmail />}
      </div>

      <Toaster />
    </div>
  );
}

export default App;

