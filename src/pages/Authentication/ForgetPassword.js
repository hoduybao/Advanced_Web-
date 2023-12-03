import {  useState } from "react";
import { VscLoading } from "react-icons/vsc";

import UserService from "../../utils/api";
import Swal from "sweetalert2";

function ForgetPassword() {
 

  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEmail(value);

    if (value === "") {
      setErrors(`Please input your ${name}!`);
    } else {
      if (!/\S+@\S+\.\S+/.test(value)) {
        setErrors(`The input is not valid E-mail!`);
      } else {
        setErrors("");
      }
    }
  };
  const handleReset = (event) => {
    event.preventDefault();

    // Handle form submission logic
    if (!errors) {
      setLoading(true);
      const fetch = async () => {
        let response = await UserService.forgetPassword(
          `user/forget-password`,
          {
            email: email,
          }
        );

        if (response.success) {
          setLoading(false);

          Swal.fire("Success", response.message, "success");
        } else {
          setLoading(false);
          Swal.fire("Error", response.message, "error");
        }
      };
      fetch();
    }
  };

  return (
    <div className="relative w-full min-h-screen">
      <div className="absolute top-[40%] bg-white rounded-2xl border shadow-2xl  left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[460px]">
        <h3 className="py-3 bg-purple-900 rounded-t-2xl text-white font-medium text-center text-lg">
          Reset your password
        </h3>
        <div className="p-8 text-sm flex flex-col">
          <label>Email</label>
          <input
            value={email}
            onChange={handleChange}
            name="email"
            type="text"
            className="pl-2 mt-1 p-[6px] rounded-md border outline-none border-gray-300  focus:border-purple-900"
          ></input>
          {errors && <span className="text-red-500 mt-[2px]">{errors}</span>}
          <button
            onClick={handleReset}
            className="bg-purple-800 cursor-pointer text-white rounded py-[6px] min-h-[36px]  text-base mt-6 mb-5 flex justify-center"
          >
            {loading ? (
              <div className="animate-spin">
                <VscLoading size={22} />
              </div>
            ) : (
              "Send reset link"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ForgetPassword;
