import React, { useEffect, useState } from 'react';
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { auth } from '../firebase'; // Assuming you're using Firebase Authentication

const AttendanceRecords = () => {
  const [records, setRecords] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    // Get current user's email to check if they are an admin
    const user = auth.currentUser;
    if (user) {
      setUserEmail(user.email);
      setIsAdmin(user.email.includes("admin")); // Check if email contains "admin"
    }

    const fetchRecords = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "attendance"));
        const attendanceData = querySnapshot.docs.map(doc => doc.data());
        
        if (isAdmin) {
          setRecords(attendanceData); // If admin, show all records
        } else {
          // If student, filter the records based on their email/name
          const studentRecords = attendanceData.filter(record => record.name === userEmail);
          setRecords(studentRecords);
        }
      } catch (error) {
        console.error("Error fetching records: ", error);
      }
    };

    fetchRecords();
  }, [isAdmin, userEmail]);

  const calculateTimeSpent = (inTime, outTime) => {
    if (inTime && outTime) {
      const inTimestamp = inTime.seconds * 1000;
      const outTimestamp = outTime.seconds * 1000;
      const timeSpent = (outTimestamp - inTimestamp) / (1000 * 60 * 60);
      return timeSpent.toFixed(2);
    }
    return 0;
  };

  return (
    <div>
      <h2>Attendance Records</h2>
      {records.length > 0 ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="attendance table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Status</TableCell>
                <TableCell align="right">In-Time</TableCell>
                <TableCell align="right">Out-Time</TableCell>
                <TableCell align="right">Time Spent (hours)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {records.map((record, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    {record.name}
                  </TableCell>
                  <TableCell align="right">{record.status}</TableCell>
                  <TableCell align="right">
                    {record.inTime ? new Date(record.inTime.seconds * 1000).toLocaleString() : "Not marked"}
                  </TableCell>
                  <TableCell align="right">
                    {record.outTime ? new Date(record.outTime.seconds * 1000).toLocaleString() : "Not marked"}
                  </TableCell>
                  <TableCell align="right">
                    {calculateTimeSpent(record.inTime, record.outTime)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <p>No records found</p>
      )}
    </div>
  );
};

export default AttendanceRecords;
