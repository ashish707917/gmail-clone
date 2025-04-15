import axios from "axios";
import { useDispatch } from "react-redux";
import { setEmails } from "../redux/appSlice";

const useGetAllEmails = () => {
  const dispatch = useDispatch();

  const fetchEmails = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/email/getallemails`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(setEmails(res.data.emails));
    } catch (error) {
      console.log("❌ Error fetching emails:", error.response?.data || error.message);
    }
  };

  return fetchEmails;
};

export default useGetAllEmails;




