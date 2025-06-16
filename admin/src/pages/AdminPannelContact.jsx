import AdminPannelNavbar from '../components/AdminPannelNavbar';
import React, { useEffect, useState } from 'react';
import '../CSS/AdminPanelContact.css';

function AdminPannelContact() {
  const [messages, setMessages] = useState([]);

  // Fetch messages from the backend
  const fetchMessages = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/form/contact/messages');
      if (response.ok) {
        const data = await response.json();
        setMessages(data);
      } else {
        alert('Error fetching messages.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <>
      <AdminPannelNavbar />
      <div className="admin-messages-container">
        <div className="admin-messages-header">
          <img src="/Images/Logo2.png" alt="MedPulse Logo" className="admin-messages-logo" />
          <h1 className="admin-messages-heading">MedPulse Messages</h1>
        </div>
        <div className="admin-messages">
          {messages.length > 0 ? (
            messages.map((message) => (
              <div key={message._id} className="admin-messages-box">
                <p><strong>Name:</strong> {message.firstName} {message.lastName}</p>
                <p><strong>Email:</strong> {message.email}</p>
                <p><strong>Mobile:</strong> {message.mobileNumber}</p>
                <p><strong>Message:</strong> {message.message}</p>
                <p className="admin-messages-time"><strong>Received At:</strong> {new Date(message.createdAt).toLocaleString()}</p>
              </div>
            ))
          ) : (
            <p className="admin-messages-no-messages">No messages found.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default AdminPannelContact;
