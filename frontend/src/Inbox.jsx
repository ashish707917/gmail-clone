import React, { useState } from "react"; 
import { MdCropSquare, MdInbox } from "react-icons/md";
import { FaCaretDown, FaUserFriends } from "react-icons/fa";
import { IoMdRefresh, IoMdMore } from "react-icons/io";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { GoTag } from "react-icons/go";
import Emails from "./Emails";

const Inbox = () => {
  const [activeTab, setActiveTab] = useState("Primary");

  return (
    <div className="flex-1 bg-white p-4 shadow-md">
      {/* Inbox Header */}
      <div className="flex items-center justify-between border-b pb-3 mb-4">
        <div className="flex items-center space-x-3">
          <MdCropSquare size={'20px'} className="text-gray-600 cursor-pointer" />
          <FaCaretDown size={'20px'} className="text-gray-600 cursor-pointer" />
          <IoMdRefresh size={'20px'} className="text-gray-600 cursor-pointer hover:rotate-180 transition-transform duration-300" />
          <IoMdMore size={'20px'} className="text-gray-600 cursor-pointer" />
        </div>
        <div className="flex items-center space-x-3">
          <span className="text-gray-700 font-medium">1-50</span>
          <MdKeyboardArrowLeft size={'20px'} className="text-gray-600 cursor-pointer" />
          <MdKeyboardArrowRight size={'20px'} className="text-gray-600 cursor-pointer" />
        </div>
      </div>
      
      {/* Tabs Section */}
      <div className="flex border-b mb-4 px-4 space-x-8">
        {[
          { name: "Primary", color: "text-blue-600 border-blue-600", icon: <MdInbox size={'20px'} /> },
          { name: "Social", color: "text-gray-600", icon: <FaUserFriends size={'20px'} /> },
          { name: "Promotions", color: "text-gray-600", icon: <GoTag size={'20px'} /> },
        ].map((tab) => (
          <button
            key={tab.name}
            className={`relative flex items-center space-x-2 text-center py-2 font-medium border-b-2 transition-colors duration-300 ${
              activeTab === tab.name ? "text-blue-600 border-blue-600" : "text-gray-600 border-transparent"
            }`}
            onClick={() => setActiveTab(tab.name)}
          >
            {tab.icon}
            <span>{tab.name}</span>
          </button>
        ))}
      </div>
      
      {/* Emails List */}
      <div>
        <p></p>
      </div>
      <Emails/>
    </div>
  );
};

export default Inbox;



