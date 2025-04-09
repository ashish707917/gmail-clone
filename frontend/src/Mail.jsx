import React from 'react';
import { IoMdArrowBack, IoMdMore } from 'react-icons/io';
import { useNavigate, useParams } from 'react-router-dom';
import { BiArchiveIn } from 'react-icons/bi';
import {
  MdDeleteOutline,
  MdOutlineAddTask,
  MdOutlineReport
} from 'react-icons/md';
import { useSelector } from 'react-redux';
import axios from 'axios';
import toast from 'react-hot-toast';
import { formatDistanceToNow } from 'date-fns';

const Mail = () => {
  const navigate = useNavigate();
  const { selectEmail } = useSelector(store => store.app);
  const params = useParams();

  const deleteHandler = async () => {
    try {
      const res = await axios.delete(`${import.meta.env.VITE_API_URL}/api/v1/email/${params.id}`, {
        withCredentials: true,
      });
      toast.success(res.data.message);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  // Check if date is valid before using it
  const isValidDate = (date) => {
    const parsedDate = new Date(date);
    return !isNaN(parsedDate); // returns true if it's a valid date
  };

  const emailDate = selectEmail?.date;
  const formattedDate = isValidDate(emailDate) ? formatDistanceToNow(new Date(emailDate)) : "Unknown date";

  return (
    <div className="flex-1 bg-white rounded-xl mx-5">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4">
        <div className="flex items-center gap-2 text-gray-700 py-2">
          <div onClick={() => navigate('/')} className="p-2 rounded-full hover:bg-gray-200 cursor-pointer">
            <IoMdArrowBack size={'20px'} />
          </div>
          <div className="p-2 rounded-full hover:bg-gray-200 cursor-pointer">
            <BiArchiveIn size={'20px'} />
          </div>
          <div className="p-2 rounded-full hover:bg-gray-200 cursor-pointer">
            <MdOutlineReport size={'20px'} />
          </div>
          <div onClick={deleteHandler} className="p-2 rounded-full hover:bg-gray-200 cursor-pointer">
            <MdDeleteOutline size={'20px'} />
          </div>
          <div className="p-2 rounded-full hover:bg-gray-200 cursor-pointer">
            <MdOutlineAddTask size={'20px'} />
          </div>
        </div>
        <div className="text-gray-700 py-2">{formattedDate} ago</div>
      </div>

      {/* Content */}
      <div className="px-4 py-3 border-b">
        <div className="font-bold text-lg">{selectEmail?.subject}</div>
        <div className="flex items-center gap-2 text-sm">
          <span>{selectEmail?.from}</span>
          <span>&bull;</span>
          <span>{selectEmail?.date}</span>
        </div>
      </div>

      {/* Body */}
      <div className="px-4 py-6">{selectEmail?.body}</div>
    </div>
  );
};

export default Mail;






