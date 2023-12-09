import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Toast from "../../components/Toast";
import { VscLoading } from "react-icons/vsc";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

import UserService from "../../utils/api/user";
import notify from "../../utils/toast";
import { login } from "../../store/user/userSlice";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

function Login() {
  const location = useLocation();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  useEffect(() => {
    if (
      location.pathname === "/auth/login" &&
      location.state &&
      location.state.fromRegister
    ) {
      notify(
        "success",
        "Register successfully! Please check email to verify account."
      );
    }
  }, [location]);

  const [loading, setLoading] = useState(false);

  const [signin, setSignin] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  let success = true;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSignin((prevInputs) => ({ ...prevInputs, [name]: value }));

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
  const handleLogin = (event) => {
    event.preventDefault();

    // Validate inputs
    const newErrors = {};
    if (!signin.email) {
      newErrors.email = "Please input your email!";
      success = false;
    }

    if (!signin.password) {
      newErrors.password = "Please input your password!";
      success = false;
    }

    // Handle form submission logic
    if (success) {
      setLoading(true);
      const fetch = async () => {
        let response = await UserService.postLogin(`user/login`, {
          email: signin.email,
          password: signin.password,
        });

        if (response.success) {
          setLoading(false);
          dispatch(
            login({
              isLoggin: true,
              token: response.accessToken,
              userData: response.userData,
            })
          );
          navigate("/", { state: { fromLogin: true } });
        } else {
          setLoading(false);
          Swal.fire("Opps!", response.message, "error");

          setErrors(newErrors);
        }
      };
      fetch();
    } else {
      setErrors(newErrors);
    }
  };

  const loginGoogle=()=>{
    window.open("http://localhost:8080/api/auth/google","_self")
  }
  
  return (
    <div className="relative w-full min-h-screen">
      <Toast />

      <div className="absolute top-[45%] bg-white rounded-2xl border shadow-2xl  left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[460px]">
        <h3 className="py-3 bg-purple-900 rounded-t-2xl text-white font-medium text-center text-lg">
          Login to BTH Classroom
        </h3>
        <div className="p-8 text-sm flex flex-col">
          <label>Email</label>
          <input
            value={signin.email}
            onChange={handleChange}
            name="email"
            type="text"
            className="pl-2 mt-1 p-[6px] rounded-md border outline-none border-gray-300  focus:border-purple-900"
          ></input>
          {errors.email && (
            <span className="text-red-500 mt-[2px]">{errors.email}</span>
          )}
          <label className="mt-4">Password</label>
          <input
            value={signin.password}
            onChange={handleChange}
            name="password"
            type="password"
            className=" pl-2 mt-1 p-[6px] rounded-md border border-gray-300 outline-none  focus:border-purple-900"
          ></input>
          {errors.password && (
            <span className="text-red-500 mt-[2px]">{errors.password}</span>
          )}
          <Link to="/auth/forget-password">
            <div className="text-right mt-1">
              Forgot your <span className="text-purple-600"> Password ?</span>
            </div>
          </Link>
          <button
            onClick={handleLogin}
            className="bg-purple-800 cursor-pointer text-white rounded py-[6px] min-h-[36px]  text-base mt-6 flex justify-center"
          >
            {loading ? (
              <div className="animate-spin">
                <VscLoading size={22} />
              </div>
            ) : (
              "Login"
            )}
          </button>
          <div className="text-center text-sm mt-8 mb-6">Or continue with</div>
          <div className="flex justify-center items-center gap-4 mb-6">
            <div onClick={loginGoogle}>
              <FcGoogle size={35} />
            </div>

            <FaFacebook color="rgb(0, 113, 240)" size={32} />
          </div>
          <div className="text-center">
            Did you have an account yet?{" "}
            <Link to="/auth/register">
              <span className="text-purple-600"> Register now</span>{" "}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
