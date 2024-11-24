import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../../Context/userContext/createContext.js";
import UCRContext from "../../Context/uniContestRegistrationContext/createContext.js";
import EventContext from "../../Context/eventContext/createContext.js";

const Login = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [invalidEmail, SetInvalidEmail] = useState(false);
  const [message, SetMessage] = useState('');
  const {login, isAuthenticated } = useContext(UserContext);
  const {fetchAllEvents, fetchAllSocieties} = useContext(EventContext);
  const {fetchAllUniversities } = useContext(UCRContext);
  const navigate = useNavigate();

  const handleChange = (e) =>{
    
    setInputs({ ...inputs, email: e.target.value })
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!inputs.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      SetInvalidEmail(true);
      return;
    }
    SetInvalidEmail(false);
    const status = await login(inputs);
    if(isAuthenticated){
        fetchAllEvents();
        fetchAllSocieties();
        fetchAllUniversities();
        navigate('/userview');
    }
    else if(status == 401){
      SetMessage('Incorrect Credentials')
    }else{
      SetMessage('internal server error');
    }
  };

  useEffect(()=>{
      const getdata = async () =>{

        if(isAuthenticated){
          fetchAllEvents()
          fetchAllSocieties();
          fetchAllUniversities();
          navigate('/userview');
        }
      }

      getdata();
  
      SetMessage('');
  },[isAuthenticated])

  return (
    <>
      <div className="flex flex-col items-center justify-center mx-auto  h-screen w-screen bg-slate-300" style={{border:'2px solid red'}}>
        <div className="max-w-md min-w-[20rem] p-6 rounded-3xl shadow-2xl bg-fuchsia-50 backdrop-filter backdrop-blur-lg">
          <h1 className="text-3xl font-semibold text-center text-gray-300">
            Login
            <span className="text-blue-500"> Socio</span>
            <span className="text-red-500">Verse</span>
          </h1>

          <form onSubmit={handleSubmit}>
            <div>
              <label className="label p-2">
                <span className="text-base label-text font-semibold">
                  Email
                </span>
              </label>
              <input
                type="email"
                placeholder="Enter Email"
                value={inputs.email}
                onChange={handleChange}
                style={{ borderColor: !invalidEmail ? 'green' : 'red' }}
                aria-invalid={!invalidEmail}
                className="w-full input h-10 input-bordered"
              />
            </div>
            <div>
              <label className="label">
                <span className="text-base label-text font-semibold">
                  Password
                </span>
              </label>
              <input
                type="password"
                value={inputs.password}
                onChange={(e) =>
                  setInputs({ ...inputs, password: e.target.value })
                }
                className="w-full input input-bordered h-10"
                placeholder="Enter Password"
              />

              {message && <p className="text-red-600 font-bold">
                {message}
              </p>}
            </div>
            <Link
              to="/signup"
              className="text-sm hover:underline hover:text-blue-600 mt-4 inline-block"
            >
              {"Don't"} have an account?
            </Link>
            <div>
              <button
                className="btn btn-block btn-sm mt-2 border border-slate-700 font-semibold"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
