import React, { useState } from 'react';
import { auth, db } from '../firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

const CheckIn = () => {
  const [status, setStatus] = useState('');
  const [inTime, setInTime] = useState(null);

  // Fetch user email from localStorage (assuming you store it after login)
  const userEmail = localStorage.getItem("userEmail");

  const handleCheckIn = async () => {
    try {
      if (!status) {
        alert('Please select a status');
        return;
      }

      // Automatically set the name using the email (you can refine this based on your logic)
      const userName = userEmail.split('@')[0];  // Simple example: using email's part before '@'

      // Add record to Firebase (attendance collection)
      const attendanceRef = collection(db, "attendance");
      await addDoc(attendanceRef, {
        email: userEmail,
        name: userName,
        status: status,
        inTime: Timestamp.now(),
        outTime: null, // Set outTime as null initially
      });

      setInTime(Timestamp.now()); // Store the check-in time
      alert('Checked in successfully!');
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div>
      <h2>Check-In</h2>
      <div>
        <label>
          Status:
          <select onChange={(e) => setStatus(e.target.value)} value={status}>
            <option value="">Select Status</option>
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
          </select>
        </label>
      </div>
      <button onClick={handleCheckIn}>Check In</button>
    </div>
  );
};

export default CheckIn;
