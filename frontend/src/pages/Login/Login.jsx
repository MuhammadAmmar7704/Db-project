import React, { useState } from "react";

const Login = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-w-96 mx-auto ">
        <div className="w-full p-6 rounded-lg shadow-2xl bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
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
                type="text"
                placeholder="Enter Email"
                value={inputs.email}
                onChange={(e) =>
                  setInputs({ ...inputs, email: e.target.value })
                }
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
            </div>
            {/* <Link
              to="/signup"
              className="text-sm hover:underline hover:text-blue-600 mt-4 inline-block"
            >
              {"Don't"} have an account?
            </Link> */}
            <div>
              <button
                // disabled={loading}
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
