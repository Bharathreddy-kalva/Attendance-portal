import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AttendanceRecords from "./pages/AttendanceRecords";
import ProtectedRoute from "./components/ProtectedRoute";

function AppRoutes() {
  console.log("AppRoutes is rendering...");
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    <Route
  path="/attendance-records"
  element={
    <ProtectedRoute>
      <AttendanceRecords />
    </ProtectedRoute>
  }
/>

    </Routes>
  );
}

export default AppRoutes;
