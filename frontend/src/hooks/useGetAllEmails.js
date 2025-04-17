import { useDispatch } from "react-redux";
import { setEmails } from "../redux/appSlice";
import axios from "axios";
import { useState } from "react";

const useGetAllEmails = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  // Fetching emails function
  const fetchEmails = async () => {
    const token = localStorage.getItem("token"); // ✅ Get token from localStorage

    if (!token) {
      console.error("No token found!");
      return; // Early exit if no token is found
    }

    try {
      setLoading(true);
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/email`, {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ Send token in request headers
        },
      });
      dispatch(setEmails(res.data.emails)); // Store emails in Redux state
    } catch (error) {
      console.error("Error fetching emails:", error);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return { fetchEmails, loading };
};

export default useGetAllEmails;





