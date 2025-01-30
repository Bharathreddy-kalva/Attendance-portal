import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, addDoc, getDocs, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // Import Firebase Authentication

const Dashboard = () => {
  const [user, setUser] = useState(null); // Track the logged-in user

  useEffect(() => {
    // Get the logged-in user from Firebase Authentication
    const auth = getAuth();
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser(currentUser); // Set user data if logged in
    } else {
      // Handle case when no user is logged in
      console.log("No user is logged in");
    }
  }, []);

  const handleMarkInTime = async () => {
    try {
      if (!user) {
        alert("You must be logged in to mark attendance");
        return;
      }
      const timestamp = new Date();
      // Use the logged-in user's email as the name
      await addDoc(collection(db, "attendance"), {
        name: user.email, // Use email as the student name
        status: "Present",
        inTime: timestamp,
        outTime: null,
        timestamp: timestamp,
      });
      alert("In-time marked successfully!");
    } catch (error) {
      console.error("Error marking in-time:", error);
    }
  };

  const handleMarkOutTime = async () => {
    try {
      if (!user) {
        alert("You must be logged in to mark out-time");
        return;
      }
      const timestamp = new Date();
      const attendanceRef = await getDocs(collection(db, "attendance"));
      const doc = attendanceRef.docs.find(
        (doc) => doc.data().name === user.email && doc.data().outTime === null
      );
      if (doc) {
        await updateDoc(doc.ref, {
          outTime: timestamp,
        });
        alert("Out-time marked successfully!");
      } else {
        alert("No in-time record found for this student.");
      }
    } catch (error) {
      console.error("Error marking out-time:", error);
    }
  };

  return (
    <div>
      <h2>Mark Attendance</h2>
      {user ? (
        <div>
          <p>Logged in as: {user.email}</p>
          <button onClick={handleMarkInTime}>Mark In-Time</button>
          <button onClick={handleMarkOutTime}>Mark Out-Time</button>
        </div>
      ) : (
        <p>Please log in to mark attendance</p>
      )}
    </div>
  );
};

export default Dashboard;
