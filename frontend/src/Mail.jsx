import React from 'react';
import { IoMdArrowBack, IoMdMore } from 'react-icons/io';
import { useNavigate, useParams } from 'react-router-dom';
import { BiArchiveIn } from 'react-icons/bi';
import {
  MdDeleteOutline,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdOutlineAddTask,
  MdOutlineDriveFileMove,
  MdOutlineMarkEmailUnread,
  MdOutlineReport,
  MdOutlineWatchLater
} from 'react-icons/md';
import { useSelector } from 'react-redux';
import axios from 'axios';
import toast from 'react-hot-toast';
import { formatDistanceToNow } from 'date-fns'; // Added for real-time formatting

const Mail = () => {
  const navigate = useNavigate();
  const { selectEmail } = useSelector(store => store.app);
  const params = useParams();

  const deleteHandler = async () => {
    try {
      const res = await axios.delete(`http://localhost:5050/api/v1/email/${params.id}`, {
        withCredentials: true,
      });
      toast.success(res.data.message);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

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
            <MdOutlineMarkEmailUnread size={'20px'} />
          </div>
          <div className="p-2 rounded-full hover:bg-gray-200 cursor-pointer">
            <MdOutlineWatchLater size={'20px'} />
          </div>
          <div className="p-2 rounded-full hover:bg-gray-200 cursor-pointer">
            <MdOutlineAddTask size={'20px'} />
          </div>
          <div className="p-2 rounded-full hover:bg-gray-200 cursor-pointer">
            <MdOutlineDriveFileMove size={'20px'} />
          </div>
          <div className="p-2 rounded-full hover:bg-gray-200 cursor-pointer">
            <IoMdMore size={'20px'} />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span>1 to 50</span>
          <MdKeyboardArrowLeft size="24px" />
          <MdKeyboardArrowRight size="24px" />
        </div>
      </div>

      {/* Email Content */}
      <div className="h-[90vh] overflow-y-auto p-4">
        {/* Subject and Inbox */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-semibold">{selectEmail?.subject}</h1>
            <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">Inbox</span>
          </div>
          <p className="text-sm text-gray-500">
            {selectEmail?.createdAt
              ? formatDistanceToNow(new Date(selectEmail.createdAt), { addSuffix: true })
              : ''}
          </p>
        </div>

        {/* Sender Info */}
        <div className="mb-6">
          <p className="text-sm text-gray-800 font-medium">{selectEmail?.to}</p>
          <p className="text-xs text-gray-500">to me</p>
        </div>

        {/* Email Body */}
        <div className="my-10">
          <p>{selectEmail?.message}</p>
        </div>
      </div>
    </div>
  );
};

export default Mail;




