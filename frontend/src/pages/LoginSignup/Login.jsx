import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../../Context/userContext/createContext.js";
import UCRContext from "../../Context/uniContestRegistrationContext/createContext.js";
import EventContext from "../../Context/eventContext/createContext.js";
import LoadingBarContext from "../../Context/LoadingBarContext/CreateContext.js";

const Login = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [invalidEmail, SetInvalidEmail] = useState(false);
  const [message, SetMessage] = useState("");
  const { login, isAuthenticated } = useContext(UserContext);
  const { fetchAllEvents, fetchAllSocieties } = useContext(EventContext);
  const { fetchAllUniversities } = useContext(UCRContext);
  const navigate = useNavigate();
  const { setProgress } = useContext(LoadingBarContext);

  const handleChange = (e) => {
    setInputs({ ...inputs, email: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setProgress(10);

    if (!inputs.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      SetInvalidEmail(true);
      return;
    }
    setProgress(30);
    SetInvalidEmail(false);

    setProgress(50);
    const status = await login(inputs);
    setProgress(100);

    if (status == 401) {
      SetMessage("Incorrect Credentials");
    } else {
      SetMessage("internal server error");
    }
  };

  useEffect(() => {
    const getdata = async () => {
      if (isAuthenticated) {
        fetchAllEvents();
        fetchAllSocieties();
        fetchAllUniversities();
        const role = localStorage.getItem("role_name");
        console.log("role = ", role);
        if (role === "Users" || role === "Student") navigate("/userview");
        else navigate("/chooseview");
        //navigate('/userview');
      }
    };

    getdata();

    SetMessage("");
  }, [isAuthenticated]);

  return (
    <>
      <div className="flex flex-col items-center justify-center mx-auto  h-screen w-screen bg-slate-300">
        <div className="max-w-md min-w-[20rem] p-6 rounded-3xl shadow-2xl bg-gray-100 backdrop-filter backdrop-blur-lg">
          <h1 className="text-3xl font-semibold text-center text-gray-300">
            <span className="text-gray-600">Login -</span>
            <span className="text-blue-500"> Socio</span>
            <span className="text-red-500">Verse</span>
          </h1>

          <form onSubmit={handleSubmit}>
            <div>
              <label className="label p-2">
                <span className="text-base label-text font-semibold">
                  {/* Email */}
                </span>
              </label>
              <input
                type="email"
                placeholder="Enter Email"
                value={inputs.email}
                onChange={handleChange}
                // style={{ borderColor: !invalidEmail ? "green" : "red" }}
                aria-invalid={!invalidEmail}
                className="w-full input h-10 input-bordered bg-white border-gray-300"
              />
            </div>
            <div>
              <label className="label">
                <span className="text-base label-text font-semibold">
                  {/* Password */}
                </span>
              </label>
              <input
                type="password"
                value={inputs.password}
                onChange={(e) =>
                  setInputs({ ...inputs, password: e.target.value })
                }
                className="w-full input input-bordered h-10 bg-white"
                placeholder="Enter Password"
              />

              {message && <p className="text-red-600 font-bold">{message}</p>}
            </div>
            <Link
              to="/signup"
              className="text-sm hover:underline text-gray-500 hover:text-[#005F73] mt-4 inline-block"
            >
              {"Don't"} have an account?
            </Link>
            <div>
              <button className="btn btn-block btn-sm mt-2 bg-[#005F73] hover:bg-opacity-100 bg-opacity-75 text-white border-0 font-semibold">
                LOGIN
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
