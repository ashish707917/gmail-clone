import React from "react";
import { MdCropSquare, MdOutlineStarBorder } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSelectEmail } from "./redux/appSlice";

const Email = ({ email }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const openMail = () => {
    dispatch(setSelectEmail(email));  // Store selected email in Redux
    navigate(`/mail/${email._id}`);   // Navigate to email details page
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();

    if (
      date.getDate() === now.getDate() &&
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear()
    ) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  };

  return (
    <div
      onClick={openMail}
      className="flex items-center justify-between border-b border-gray-200 px-4 py-3 text-sm hover:cursor-pointer hover:shadow-md"
    >
      <div className="flex items-center gap-3">
        <div className="text-gray-400">
          <MdCropSquare size={"20px"} />
        </div>
        <div className="text-gray-400">
          <MdOutlineStarBorder size={"20px"} />
        </div>
        <div>
          <h1 className="font-semibold">{email?.subject}</h1>
        </div>
      </div>
      <div className="flex-1 ml-4">
        <p className="truncate">{email?.message}</p>
      </div>
      <div className="flex-none text-gray-400 text-sm">
        <p>{formatDate(email?.createdAt)}</p>
      </div>
    </div>
  );
};

export default Email;



