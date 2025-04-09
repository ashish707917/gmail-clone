import React, { useEffect, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoIosSearch, IoIosSettings } from "react-icons/io";
import { CiCircleQuestion } from "react-icons/ci";
import { TbGridDots } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser, setSearchText } from "./redux/appSlice";
import axios from "axios";
import toast from "react-hot-toast";

const Navbar = () => {
  const [text, setText] = useState("");
  const { user } = useSelector((store) => store.app);
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    try {
      const res = await axios.post('http://localhost:5050/api/v1/user/logout', {}, {
        withCredentials: true
      });
      toast.success(res.data.message);
      dispatch(setAuthUser(null));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(setSearchText(text));
  }, [text]);

  return (
    <div className="flex items-center justify-between bg-gray-100 p-3 shadow-md">
      {/* Left Section */}
      <div className="flex items-center space-x-4">
        <RxHamburgerMenu className="w-6 h-6 cursor-pointer" />
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0J3R6Uwnqkbf2ixL1Qb_oavnvO5d_CR6Cmw&s"
          alt="gmail-logo"
          className="w-12 h-12 object-contain"
        />
        <h1 className="text-xl font-semibold text-red-500">Gmail</h1>
      </div>

      {/* Middle Section: Always show search bar */}
      <div className="flex items-center bg-white p-2 rounded-md shadow-sm w-1/2 border border-gray-300">
        <IoIosSearch className="w-5 h-5 text-gray-500" />
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Search mail"
          className="ml-2 w-full outline-none bg-transparent"
        />
      </div>

      {/* Right Section: Icons + Avatar */}
      <div className="flex items-center space-x-4">
        <CiCircleQuestion className="w-6 h-6 cursor-pointer text-gray-600" />
        <IoIosSettings className="w-6 h-6 cursor-pointer text-gray-600" />
        <TbGridDots className="w-6 h-6 cursor-pointer text-gray-600" />
        <button onClick={logoutHandler} className="underline cursor-pointer">logout</button>
        <img
          src={user?.profilephoto || "https://i.pravatar.cc/150?u=guest"}
          alt="profile"
          className="w-10 h-10 rounded-full cursor-pointer border"
        />
      </div>
    </div>
  );
};

export default Navbar;

