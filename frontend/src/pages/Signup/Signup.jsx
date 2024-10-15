import { useState } from "react";

const Signup = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password } = inputs;
    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (!response.ok) {
        throw new Error("Network Response was not okay");
      }

      const data = await response.json();
      console.log("Success:", data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <>
      <div className=" flex flex-col items-center justify-center min-w-96 mx-auto">
        <div className="w-full p-6 rounded-lg backdrop-filter bg-gray-400 shadow-md bg-clip-padding backdrop-blur-lg bg-opacity-0">
          <h1 className="text-3xl font-semibold text-center text-gray-300">
            Signup<span className="text-blue-400"> - Socio</span>
            <span className="text-red-400">Verse</span>
          </h1>
          <form onSubmit={handleSubmit}>
            <div>
              <label className="label p-2">
                <span className="text-ba se label-text font-semibold">
                  Email
                </span>
              </label>
              <input
                type="text"
                className="input input-bordered h-10 w-full"
                placeholder="Anas@gmail.com"
                value={inputs.email}
                onChange={(e) => {
                  setInputs({ ...inputs, email: e.target.value });
                }}
              />
            </div>
            <div>
              <label className="label p-2">
                <span className="text-base label-text font-semibold">
                  Username
                </span>
              </label>
              <input
                type="text"
                className="input input-bordered h-10 w-full"
                placeholder="AnasCool333"
                value={inputs.username}
                onChange={(e) => {
                  setInputs({ ...inputs, username: e.target.value });
                }}
              />
            </div>
            <div>
              <label className="label p-2">
                <span className="text-base label-text font-semibold">
                  Password
                </span>
              </label>
              <input
                type="password"
                className="input input-bordered h-10 w-full"
                placeholder="Enter Password"
                value={inputs.password}
                onChange={(e) => {
                  setInputs({ ...inputs, password: e.target.value });
                }}
              />
            </div>
            <div>
              <button
                type="submit"
                className="btn btn-block btn-sm mt-2 border border-slate-700"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
