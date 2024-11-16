import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserView from "./pages/UserView/UserView.jsx";
import "./App.css";
import {EventProvider} from "./Context/eventContext/eventContext.jsx"
import axios from "axios";

function App() {
  axios.defaults.baseURL = 'http://localhost:5000';

  return (
    <EventProvider>
      <Router>
        <Routes>
          <Route path="/userview/*" element={<UserView />} />
        </Routes>
      </Router>
    </EventProvider>
  );
}

export default App;
