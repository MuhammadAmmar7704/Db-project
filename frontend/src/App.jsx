import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import UserView from "./pages/UserView/UserView.jsx";
import "./App.css";
import {EventProvider} from "./Context/eventContext/eventContext.jsx"
import axios from "axios";
import { UCRProvider } from "./Context/uniContestRegistrationContext/UCRContext.jsx";
import Login from "./pages/LoginSignup/Login.jsx";
import { UserProvider } from "./Context/userContext/UserContext.jsx";
import Signup from "./pages/LoginSignup/Signup.jsx";
import AdminView from "./pages/SuperAdmin/AdminView.jsx";
import { AdminProvider } from "./Context/adminContext/AdminContext.jsx";

function App() {
  axios.defaults.baseURL = 'http://localhost:5000';
  
  
  console.log(document.cookie)

  return (
    <UCRProvider>
    <EventProvider>
    <UserProvider>
    <AdminProvider>
      <Router>
        <Routes>
          <Route path="/userview/*" element={<UserView />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/adminview/*" element={<AdminView />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AdminProvider>
    </UserProvider>
    </EventProvider>
    </UCRProvider>
  );
}

export default App;
