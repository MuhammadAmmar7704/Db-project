import Home from "./pages/UserView/Home.jsx";
import Login from "./pages/Login/Login.jsx";
import Signup from "./pages/Signup/Signup.jsx";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css'
import UserView from "./pages/UserView/UserView.jsx";

function App() {



  return (
    <>
    <Router>
      <Routes>
      <Route path="/userview/*" element={<UserView/>}/>
      {/* <Route path="/login" element={<Login />} /> */}
      {/* <Signup /> */}
      </Routes>
    </Router>
      


    </>
  );
}

export default App;
