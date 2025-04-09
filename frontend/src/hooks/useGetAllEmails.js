// useGetAllEmails.js
import axios from "axios";
import { useDispatch } from "react-redux";
import { setEmails } from "../redux/appSlice";

const useGetAllEmails = () => {
  const dispatch = useDispatch();

  const fetchEmails = async () => {
    try {
      const res = await axios.get("http://localhost:5050/api/v1/email/getallemails", {
        withCredentials: true,
      });
      dispatch(setEmails(res.data.emails));
    } catch (error) {
      console.log("❌ Error fetching emails:", error.response?.data || error.message);
    }
  };

  return fetchEmails; // return the function
};

export default useGetAllEmails;



