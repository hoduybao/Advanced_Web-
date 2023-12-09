import { VscLoading } from "react-icons/vsc";
import UserService from "../../utils/api/user";

import { useState } from "react";
import Swal from "sweetalert2";

function ChangePassword() {
  const [loading, setLoading] = useState(false);


  const [changePassword, setChangePassword] = useState({
    password: "",
    newPassword: "",
    confirm: "",
  }); // Bỏ giá trị mặc định là {}
  const [errors, setErrors] = useState({
    password: "",
    newPassword: "",
    confirm: "",
  });

  const handleChange = (event) => {
    var { name, value } = event.target;
    setChangePassword((prevInputs) => ({ ...prevInputs, [name]: value }));
    let realName = name;
    if (name === "newPassword") {
      realName = "new password";
    } else if (name === "password") {
      realName = "current password";
    } else {
      realName = "confirm password";
    }

    if (value === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: `Please input your ${realName}!`,
      }));
    } else if (name === "confirm" && !(value === changePassword.newPassword)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: `Confirm password do not match!`,
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    }
  };

  const handleChangePassword = (event) => {
    event.preventDefault();
    if (!errors.confirm&&!errors.newPassword&&!errors.password) {
        setLoading(true);
       
        const fetch = async () => {
            let response = await UserService.resetPassword(
              `user/reset-password`,
              {
                password: changePassword.password,
                newpassword:changePassword.newPassword
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
    <div className="w-full mt-10 flex justify-center">
      <div className="w-[65%] bg-white mt-6 rounded-md shadow-md border border-t-[#210035] border-t-4">
        <div className="w-full py-3 px-5 bg-slate-100 bg-[rgba(245, 246, 250,1)] text-slate-600 shadow ">
          Change password
        </div>
        <div className="mt-10 mb-14 flex flex-col gap-5">
          <div className={"flex gap-3"}>
            <label className="w-[35%] text-right">
              <span className="text-red-600 text-lg">* </span>Current password :
            </label>
            <div className="w-[40%] flex flex-col">
              <input
                type="password"
                name="password"
                value={changePassword?.password}
                onChange={handleChange}
                className=" px-2 border rounded outline-none shadow  text-gray-600 h-9 focus:border-blue-300"
              />
              {errors?.password && (
                <span className="text-red-500 mt-[2px]">{errors.password}</span>
              )}
            </div>
          </div>

          <div className={"flex gap-3"}>
            <label className="w-[35%] text-right">
              <span className="text-red-600 text-lg">* </span>New password :
            </label>
            <div className="w-[40%] flex flex-col">
              <input
                type="password"
                name="newPassword"
                value={changePassword?.newPassword}
                onChange={handleChange}
                className=" px-2 border rounded outline-none shadow  text-gray-600 h-9 focus:border-blue-300"
              />
              {errors?.newPassword && (
                <span className="text-red-500 mt-[2px]">
                  {errors.newPassword}
                </span>
              )}
            </div>
          </div>

          <div className={"flex gap-3"}>
            <label className="w-[35%] text-right">
              <span className="text-red-600 text-lg">* </span>Confirm password :
            </label>
            <div className="w-[40%] flex flex-col">
              <input
                type="password"
                name="confirm"
                value={changePassword?.confirm}
                onChange={handleChange}
                className=" px-2 border rounded outline-none shadow  text-gray-600 h-9 focus:border-blue-300"
              />
              {errors?.confirm && (
                <span className="text-red-500 mt-[2px]">{errors.confirm}</span>
              )}
              <button
                onClick={handleChangePassword}
                className="text-sm self-end rounded !py-[8px] w-[170px]  min-w-[170px]  min-h-[36px] bg-purple-700 hover:bg-purple-900 h-9 text-white mt-6 flex justify-center"
              >
                {loading ? (
                  <div className="animate-spin">
                    <VscLoading size={22} />
                  </div>
                ) : (
                  "Change password"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
