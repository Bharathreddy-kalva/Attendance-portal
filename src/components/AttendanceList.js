import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

function AttendanceList() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const fetchAttendance = async () => {
      const snapshot = await getDocs(collection(db, "attendance"));
      setRecords(snapshot.docs.map(doc => doc.data()));
    };

    fetchAttendance();
  }, []);

  return (
    <div>
      <h2>Attendance Records</h2>
      <ul>
        {records.map((record, index) => (
          <li key={index}>{record.email} - {new Date(record.timestamp.seconds * 1000).toLocaleString()}</li>
        ))}
      </ul>
    </div>
  );
}

export default AttendanceList;
