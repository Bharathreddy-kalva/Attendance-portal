import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar"; // Import Navbar component
import AppRoutes from "./routes"; // Import your routes

function App() {
  return (
    <Router>
      <Navbar /> {/* Include the Navbar here */}
      <AppRoutes /> {/* Include your routes */}
    </Router>
  );
}

export default App;
