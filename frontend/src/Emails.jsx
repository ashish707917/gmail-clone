import React, { useEffect, useState } from 'react';
import Email from './Email';
import useGetAllEmails from "./hooks/useGetAllEmails";
import { useSelector } from 'react-redux';

const Emails = () => {
  const fetchEmails = useGetAllEmails(); // ✅ get the function
  const { emails, searchText } = useSelector(store => store.app);
  const [filterEmail, setFilterEmail] = useState([]);

  useEffect(() => {
    fetchEmails(); // ✅ actually call the fetch function on mount
  }, []);

  useEffect(() => {
    const filteredEmail = emails.filter((email) => {
      return (
        email.subject.toLowerCase().includes(searchText.toLowerCase()) ||
        email.to.toLowerCase().includes(searchText.toLowerCase()) ||
        email.message.toLowerCase().includes(searchText.toLowerCase())
      );
    });
    setFilterEmail(filteredEmail);
  }, [searchText, emails]);

  return (
    <div>
      {filterEmail && filterEmail.map((email) => (
        <Email key={email._id} email={email} />
      ))}
    </div>
  );
};

export default Emails;


