import { useContext, useEffect, useState } from "react";
import UserContext from "../../Context/userContext/createContext.js";
import { useNavigate } from "react-router-dom";
import UCRContext from "../../Context/uniContestRegistrationContext/createContext.js";

const Signup = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
    isStudent: false,
    university_id: "",
  });

  const {universities, fetchAllUniversities} = useContext(UCRContext)
  const {signup} = useContext(UserContext);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllUniversities();
  }, []);

  const validateInputs = () => {
    const validationErrors = {};
    if (!inputs.username.trim()) {
      validationErrors.username = "Username is required";
    }
    if (!inputs.email.trim()) {
      validationErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(inputs.email)) {
      validationErrors.email = "Invalid email format";
    }
    if (!inputs.password) {
      validationErrors.password = "Password is required";
    }
    if (!inputs.confirmpassword) {
      validationErrors.confirmpassword = "Confirm Password is required";
    } else if (inputs.password !== inputs.confirmpassword) {
      validationErrors.confirmpassword = "Passwords do not match";
    }

    if (inputs.isStudent && !inputs.university_id) {
      validationErrors.university_id = "Please select a university";
    }
    return validationErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateInputs();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    
    
    try {
      
      const status = await signup(inputs);
      if(status == 201){
        setMessage('');
        navigate('/login');
      }
      setMessage(status.response.data.error);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleStudentChange = (e) => {
    const isStudent = e.target.value === "Yes";
    setInputs({ ...inputs, isStudent, university_id: "" });
    setErrors({ ...errors, university_id: "" });
  };

  return (
    <>
      <div
        className="flex flex-col items-center justify-center mx-auto h-screen w-screen bg-slate-300"
        style={{ border: "2px solid red" }}
      >
        <div className="max-w-md min-w-[20rem] p-6 rounded-3xl shadow-2xl bg-fuchsia-50 backdrop-filter backdrop-blur-lg">
          <h1 className="text-3xl font-semibold text-center text-gray-300">
            SignUp
            <span className="text-blue-500"> Socio</span>
            <span className="text-red-500">Verse</span>
          </h1>

          {message && <p className="text-red-500 font-bold">
            {message}
          </p>}

          <form onSubmit={handleSubmit}>
            <div>
              <label className="label p-2">
                <span className="text-base label-text font-semibold">
                  Username
                </span>
              </label>
              <input
                type="text"
                name="username"
                placeholder="Enter Username"
                value={inputs.username}
                onChange={handleChange}
                className="w-full input h-10 input-bordered"
              />
              {errors.username && (
                <p className="text-red-600 font-bold">{errors.username}</p>
              )}
            </div>

            <div>
              <label className="label p-2">
                <span className="text-base label-text font-semibold">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter Email"
                value={inputs.email}
                onChange={handleChange}
                className="w-full input h-10 input-bordered"
              />
              {errors.email && (
                <p className="text-red-600 font-bold">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="label">
                <span className="text-base label-text font-semibold">
                  Password
                </span>
              </label>
              <input
                type="password"
                name="password"
                value={inputs.password}
                onChange={handleChange}
                className="w-full input input-bordered h-10"
                placeholder="Enter Password"
              />
              {errors.password && (
                <p className="text-red-600 font-bold">{errors.password}</p>
              )}
            </div>

            <div>
              <label className="label">
                <span className="text-base label-text font-semibold">
                  Confirm Password
                </span>
              </label>
              <input
                type="password"
                name="confirmpassword"
                value={inputs.confirmpassword}
                onChange={handleChange}
                className="w-full input input-bordered h-10"
                placeholder="Confirm Password"
              />
              {errors.confirmpassword && (
                <p className="text-red-600 font-bold">
                  {errors.confirmpassword}
                </p>
              )}
            </div>

            {/* Are you a Student? */}
            <div>
              <label className="label p-2">
                <span className="text-base label-text font-semibold">
                  Are you a Student?
                </span>
              </label>
              <div className="flex space-x-4">
                <label>
                  <input
                    type="radio"
                    name="isStudent"
                    value="Yes"
                    checked={inputs.isStudent}
                    onChange={handleStudentChange}
                  />
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    name="isStudent"
                    value="No"
                    checked={!inputs.isStudent}
                    onChange={handleStudentChange}
                  />
                  No
                </label>
              </div>
            </div>

            {/* University Dropdown */}
            {inputs.isStudent && (
              <div>
                <label className="label p-2">
                  <span className="text-base label-text font-semibold">
                    Select University
                  </span>
                </label>
                <select
                  name="university_id"
                  value={inputs.university_id}
                  onChange={handleChange}
                  className="w-full input h-10 input-bordered"
                >
                  <option value="">Select University</option>
                  {universities.map((university) => (
                    <option
                      key={university.university_id}
                      value={university.university_id}
                    >
                      {university.name}
                    </option>
                  ))}
                </select>
                {errors.university_id && (
                  <p className="text-red-600 font-bold">{errors.university_id}</p>
                )}
              </div>
            )}

            <div>


              <button
                className="btn btn-block btn-sm mt-2 border border-slate-700 font-semibold"
                type="submit"
              >
                Signup
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
