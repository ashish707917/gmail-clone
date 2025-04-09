import React, { useEffect, useState } from 'react';
import { IoMdArrowBack } from 'react-icons/io';
import { useNavigate, useParams } from 'react-router-dom';
import {
  BiArchiveIn,
  MdDeleteOutline,
  MdOutlineAddTask,
  MdOutlineReport
} from 'react-icons/md';
import axios from 'axios';
import toast from 'react-hot-toast';
import { formatDistanceToNow } from 'date-fns';

const Mail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [email, setEmail] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchEmail = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/email/${id}`, {
        withCredentials: true,
      });
      setEmail(res.data.email);
    } catch (err) {
      console.error("❌ Error fetching email:", err);
      toast.error("Failed to load email.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmail();
  }, [id]);

  const deleteHandler = async () => {
    try {
      const res = await axios.delete(`${import.meta.env.VITE_API_URL}/api/v1/email/${id}`, {
        withCredentials: true,
      });
      toast.success(res.data.message);
      navigate('/');
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete email");
    }
  };

  const formattedDate = email?.createdAt
    ? formatDistanceToNow(new Date(email.createdAt))
    : "Unknown date";

  if (loading) return <div className="p-4">Loading...</div>;

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
        <div className="font-bold text-lg">{email?.subject}</div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>{email?.to}</span>
          <span>&bull;</span>
          <span>{new Date(email?.createdAt).toLocaleString()}</span>
        </div>
      </div>

      {/* Body */}
      <div className="px-4 py-6 whitespace-pre-wrap">{email?.message}</div>
    </div>
  );
};

export default Mail;








