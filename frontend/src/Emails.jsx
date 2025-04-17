import React, { useEffect, useState } from 'react';
import Email from './Email';
import useGetAllEmails from './hooks/useGetAllEmails';
import { useSelector } from 'react-redux';

const Emails = () => {
  const { emails = [], searchText } = useSelector(store => store.app); // Default to an empty array if emails are undefined
  const [filterEmail, setFilterEmail] = useState([]); // State to store filtered emails
  const { fetchEmails, loading } = useGetAllEmails(); // Custom hook to fetch emails

  // ✅ Fetch emails only once on component mount
  useEffect(() => {
    if (emails.length === 0) {
      fetchEmails(); // Fetch emails only if they are not in state
    }
  }, []); // Empty dependency array to call fetchEmails only once

  // ✅ Filter emails based on searchText whenever emails or searchText changes
  useEffect(() => {
    if (emails && searchText) {
      const filteredEmail = emails.filter((email) => {
        return (
          email.subject?.toLowerCase().includes(searchText.toLowerCase()) ||
          email.to?.toLowerCase().includes(searchText.toLowerCase()) ||
          email.message?.toLowerCase().includes(searchText.toLowerCase())
        );
      });
      setFilterEmail(filteredEmail); // Update filtered emails
    }
  }, [emails, searchText]); // Re-run filtering if emails or searchText change

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : filterEmail.length > 0 ? (
        filterEmail.map((email) => (
          <Email key={email._id} email={email} />
        ))
      ) : (
        <p className="text-center text-gray-500 mt-4">No emails found.</p>
      )}
    </div>
  );
};

export default Emails;


