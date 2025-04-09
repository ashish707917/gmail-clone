import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setAuthUser } from './redux/appSlice';
import useGetAllEmails from './hooks/useGetAllEmails'; // ✅ Import fetch hook

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fetchEmails = useGetAllEmails(); // ✅ Hook to get emails after login

  const changeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5050/api/v1/user/login", input, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      });

      if (res.data.success) {
        dispatch(setAuthUser(res.data.user));
        await fetchEmails(); // ✅ Fetch emails for this user
        toast.success(res.data.message);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex items-center justify-center w-screen h-screen bg-[#f6f8fc]'>
      <form
        onSubmit={submitHandler}
        className='flex flex-col gap-3 bg-white p-6 rounded-lg shadow-md w-[90%] max-w-sm'
      >
        <h1 className='font-bold text-2xl uppercase text-center my-2'>Login</h1>

        <input
          onChange={changeHandler}
          value={input.email}
          name='email'
          type='email'
          placeholder='Email'
          className='border border-gray-400 rounded-md px-3 py-2'
          disabled={loading}
          required
        />

        <input
          onChange={changeHandler}
          value={input.password}
          name='password'
          type='password'
          placeholder='Password'
          className='border border-gray-400 rounded-md px-3 py-2'
          disabled={loading}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className='bg-gray-800 text-white py-2 rounded-md mt-2 disabled:opacity-50 transition'
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className='text-sm text-center'>
          Don&apos;t have an account?{" "}
          <Link to="/signup" className='text-blue-600 underline'>
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;


