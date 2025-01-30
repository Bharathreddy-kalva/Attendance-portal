// src/components/Navbar.js
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <nav style={styles.navbar}>
      <h2 style={styles.logo}>College Attendance</h2>
      <div>
        <Link to="/dashboard" style={styles.link}>Dashboard</Link>
        <Link to="/attendance-records" style={styles.link}>Attendance Records</Link>
        <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "white",
  },
  logo: {
    margin: 0,
  },
  link: {
    color: "white",
    textDecoration: "none",
    margin: "0 15px",
    fontSize: "18px",
  },
  logoutBtn: {
    backgroundColor: "red",
    color: "white",
    border: "none",
    padding: "8px 15px",
    cursor: "pointer",
  },
};

export default Navbar;