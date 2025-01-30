import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

const AttendanceRecords = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const fetchRecords = async () => {
      const querySnapshot = await getDocs(collection(db, "attendance"));
      const attendanceData = querySnapshot.docs.map(doc => doc.data());
      setRecords(attendanceData);
    };
    fetchRecords();
  }, []);

  // Function to calculate the time spent in college (in hours)
  const calculateTimeSpent = (inTime, outTime) => {
    if (inTime && outTime) {
      const inTimestamp = inTime.seconds * 1000; // Firebase timestamp in milliseconds
      const outTimestamp = outTime.seconds * 1000;
      const timeSpent = (outTimestamp - inTimestamp) / (1000 * 60 * 60); // Convert milliseconds to hours
      return timeSpent.toFixed(2); // Round to 2 decimal places
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
