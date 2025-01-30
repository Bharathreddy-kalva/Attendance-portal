import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, getDocs, updateDoc } from "firebase/firestore"; // Import missing functions

const Dashboard = () => {
  const [studentName, setStudentName] = useState("");

  const handleMarkInTime = async () => {
    try {
      const timestamp = new Date();
      await addDoc(collection(db, "attendance"), {
        name: studentName,
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
      const timestamp = new Date();
      const attendanceRef = await getDocs(collection(db, "attendance"));
      const doc = attendanceRef.docs.find(
        (doc) => doc.data().name === studentName && doc.data().outTime === null
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
      <input
        type="text"
        placeholder="Student Name"
        value={studentName}
        onChange={(e) => setStudentName(e.target.value)}
      />
      <button onClick={handleMarkInTime}>Mark In-Time</button>
      <button onClick={handleMarkOutTime}>Mark Out-Time</button>
    </div>
  );
};

export default Dashboard;
