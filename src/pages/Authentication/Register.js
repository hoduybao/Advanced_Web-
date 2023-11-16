import { Link } from "react-router-dom";
function Register() {
  
  return (
    <div className="relative w-full min-h-[120vh]">
      <div className="absolute top-[40%]  bg-white rounded-2xl border shadow-2xl  left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[460px]">
        <h3 className="py-3 bg-purple-900 rounded-t-2xl text-white font-medium text-center text-lg">
          Register to BTH Classroom
        </h3>
        <div className="p-8 text-sm flex flex-col">
          <label>Full Name</label>
          <input
            type="text"
            className="pl-2 mt-1 mb-4 p-[6px] rounded-md border border-gray-300  focus:border-sky-400"
          ></input>
      
          <label>Email</label>
          <input
            type="email"
            className="pl-2 mt-1 mb-4 p-[6px] rounded-md border border-gray-300  focus:border-sky-400"
          ></input>
          <label>Password</label>
          <input
            type="password"
            className="my-1 mb-4 p-[6px] rounded-md border border-gray-300  focus:border-sky-400"
          ></input>

             <label>Confirm Password</label>
          <input
            type="password"
            className="my-1 p-[6px] rounded-md border border-gray-300  focus:border-sky-400"
          ></input>
        
          <button className="bg-purple-800 cursor-pointer text-white rounded-md py-[6px] text-base mt-6 mb-10">
            Register
          </button>
            <div className="text-center">
              Already have an account?{" "}
              <Link to='/auth/login'>

              <span className="text-purple-600"> Login now</span>
              </Link>

            </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
