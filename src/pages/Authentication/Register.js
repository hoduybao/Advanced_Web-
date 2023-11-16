import { Link, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import { VscLoading } from "react-icons/vsc";

import UserService from "../../utils/api";
function Register() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [signup, setSignup] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  let success = true;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSignup((prevInputs) => ({ ...prevInputs, [name]: value }));

    if (value === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: `Please input your ${name}!`,
      }));
    } else {
      if (name === "email" && !/\S+@\S+\.\S+/.test(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: `The input is not valid E-mail!`,
        }));
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
      }
    }
  };
  const handleRegister = (event) => {
    event.preventDefault();

    // Validate inputs
    const newErrors = {};
    if (!signup.email) {
      newErrors.email = "Please input your email!";
      success = false;
    }
    if (!signup.name) {
      newErrors.name = "Please input your name!";
      success = false;
    }
    if (!signup.password) {
      newErrors.password = "Please input your password!";
      success = false;
    }
    if (!signup.confirm || signup.password !== signup.confirm) {
      newErrors.confirm = "Confirm password is incorrect";
      success = false;
    }

    // Handle form submission logic
    if (success) {
      setLoading(true);
      const fetch = async () => {
        let response = await UserService.postRegister(`user/register`, {
          fullname: signup.name,
          email: signup.email,
          password: signup.password,
        });

        console.log(response);
        if (response.success) {
          setLoading(false);  
          navigate("/auth/login",{ state: { fromRegister: true } });

        } else {
          setLoading(false);
          newErrors.email = response.message;
          setErrors(newErrors);
        }
      };
      fetch();
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="relative w-full min-h-[120vh]">
      <div className="absolute top-[40%]  bg-white rounded-2xl border shadow-2xl  left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[460px]">
        <h3 className="py-3 bg-purple-900 rounded-t-2xl text-white font-medium text-center text-lg">
          Register to BTH Classroom
        </h3>
        <div className="p-8 text-sm flex flex-col">
          <label>Full Name</label>
          <input
            value={signup.name}
            name="name"
            onChange={handleChange}
            type="text"
            className="pl-2 mt-1  p-[6px] rounded-md border border-gray-300 outline-none focus:border-sky-400"
          ></input>
          {errors.name && (
            <span className="text-red-500 mt-[2px]">{errors.name}</span>
          )}

          <label className="mt-4">Email</label>
          <input
            value={signup.email}
            name="email"
            onChange={handleChange}
            type="email"
            className="pl-2 mt-1  p-[6px] rounded-md border border-gray-300 outline-none  focus:border-sky-400"
          ></input>
          {errors.email && (
            <span className="text-red-500 mt-[2px]">{errors.email}</span>
          )}
          <label className="mt-4">Password</label>
          <input
            value={signup.password}
            name="password"
            onChange={handleChange}
            type="password"
            className="mt-1  p-[6px] rounded-md border border-gray-300 outline-none  focus:border-sky-400"
          ></input>
          {errors.password && (
            <span className="text-red-500 mt-[2px]">{errors.password}</span>
          )}
          <label className="mt-4">Confirm Password</label>
          <input
            value={signup.confirm}
            name="confirm"
            onChange={handleChange}
            type="password"
            className="mt-1 p-[6px] rounded-md border border-gray-300 outline-none  focus:border-sky-400"
          ></input>
          {errors.confirm && (
            <span className="text-red-500 mt-[2px]">{errors.confirm}</span>
          )}

          <button
            onClick={handleRegister}
            className="bg-purple-800 cursor-pointer text-white rounded-md py-[6px] min-h-[36px]  text-base mt-6 mb-10 flex justify-center"
          >
            {loading ? (
              <div className="animate-spin">
                <VscLoading size={22} />
              </div>
            ) : (
              "Register"
            )}
          </button>
          <div className="text-center">
            Already have an account?{" "}
            <Link to="/auth/login">
              <span className="text-purple-600"> Login now</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
