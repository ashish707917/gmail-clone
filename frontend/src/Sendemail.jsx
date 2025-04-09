import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setOpen } from "./redux/appSlice";
import { MdClose } from "react-icons/md";
import useGetAllEmails from "./hooks/useGetAllEmails"; // import the hook

const Sendemail = () => {
  const dispatch = useDispatch();
  const fetchEmails = useGetAllEmails(); // get the fetch function

  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:5050/api/v1/email",
        { to, subject, message },
        { withCredentials: true }
      );
      alert("Email sent successfully");

      fetchEmails(); // ✅ update the inbox after sending

      dispatch(setOpen(false));
      setTo("");
      setSubject("");
      setMessage("");
    } catch (error) {
      alert("Failed to send email");
      console.error("Error sending email:", error);
    }
  };

  return (
    <div className="fixed bottom-5 right-6 w-[512px] bg-white rounded-xl shadow-xl z-50 overflow-hidden border border-gray-300">
      <div className="flex justify-between items-center px-4 py-2 bg-gray-100 border-b">
        <span className="font-semibold text-sm text-gray-800">New Message</span>
        <button
          onClick={() => dispatch(setOpen(false))}
          className="text-gray-600 hover:text-black"
        >
          <MdClose size={20} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col px-4 py-2 space-y-3 text-sm">
        <input
          type="email"
          placeholder="To"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className="border-b border-gray-200 focus:outline-none py-1 px-2"
          required
        />
        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="border-b border-gray-200 focus:outline-none py-1 px-2"
          required
        />
        <textarea
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="min-h-[160px] resize-none focus:outline-none px-2 py-2 text-sm"
          required
        />
        <div className="flex items-center justify-between pt-2">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-1.5 rounded-2xl text-sm"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default Sendemail;





