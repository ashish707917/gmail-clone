import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectEmail } from '../redux/appSlice';
import axios from 'axios';
import toast from 'react-hot-toast';
import { formatDistanceToNow } from 'date-fns';

const Mail = () => {
  const navigate = useNavigate();
  const { selectEmail } = useSelector((state) => state.app);
  const dispatch = useDispatch();
  const params = useParams();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmail = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/email/${params.id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        dispatch(setSelectEmail(response.data.email));
        setError(null); // Clear any previous errors
      } catch (error) {
        setError("Error fetching email");
        console.error("Error fetching email:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmail();
  }, [params.id, dispatch]);

  const deleteHandler = async () => {
    try {
      const res = await axios.delete(`${import.meta.env.VITE_API_URL}/api/v1/email/${params.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      toast.success(res.data.message);
      navigate('/');
    } catch (error) {
      console.log(error);
      toast.error("Error deleting email");
    }
  };

  const isValidDate = (date) => {
    const parsedDate = new Date(date);
    return !isNaN(parsedDate);
  };

  const emailDate = selectEmail?.createdAt;
  const formattedDate = isValidDate(emailDate) ? formatDistanceToNow(new Date(emailDate)) : "Unknown date";

  if (loading) {
    return <div>Loading...</div>;  // You can replace this with a spinner or skeleton loader
  }

  if (error) {
    return <div>{error}</div>;  // Display error message if the email couldn't be fetched
  }

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
        </div>
        <div className="text-gray-700 py-2">{formattedDate} ago</div>
      </div>

      {/* Content */}
      <div className="px-4 py-3 border-b">
        <div className="font-bold text-xl flex justify-between items-center">
          {selectEmail?.subject}
          <span className="text-sm font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-md">Inbox</span>
        </div>
        <div className="text-sm text-gray-600 mt-1">
          <strong>From:</strong> {selectEmail?.from}
        </div>
        <div className="text-sm text-gray-600">
          <strong>To:</strong> {selectEmail?.to}
        </div>
      </div>

      {/* Body */}
      <div className="px-4 py-6 text-gray-800 whitespace-pre-line">
        {selectEmail?.message}
      </div>
    </div>
  );
};

export default Mail;











