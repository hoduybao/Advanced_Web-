import logo from "../../assets/logo.svg";
import { MdEdit } from "react-icons/md";

function Profile() {
  return (
    <div className="w-full min-h-screen flex justify-center">
      <div className="w-[65%] bg-white mt-6 rounded-md shadow-md border border-t-[#210035] border-t-4">
        <div className="flex justify-center my-8 gap-8  ">
           <div className="relative">
           <img
            src={logo}
            className="border shadow rounded-full w-[120px]"
            alt="avatar"
          />
          <div className="absolute bottom-0 right-1 w-7 h-7 rounded-full flex justify-center items-center bg-purple-700 hover:bg-purple-900 cursor-pointer">
          <MdEdit size={16} color="#fff"/>

          </div>
           </div>
       
          <div className="flex flex-col justify-center">
            <h1 className="text-xl font-medium">Hồ Duy Bảo</h1>
            <h4 className="text-gray-700">Email: hoduybaoo@gmail.com</h4>
          </div>
        </div>
        <div className="w-full py-2 px-5 bg-slate-100 bg-[rgba(245, 246, 250,1)] text-slate-600 shadow ">
            Account
        </div>
        <div className="mt-8 flex flex-col gap-7">
            <div className="flex gap-3 items-center">
                <label className="w-[30%] text-right"><span className="text-red-600 text-lg">* </span>Name :</label>
                <input type="text" className=" px-2 border rounded outline-none shadow  text-gray-600 h-9 w-[40%] focus:border-blue-300" />
            </div>
            <div className="flex gap-3 items-center">
                <label className="w-[30%] text-right">Email :</label>
                <input type="text" value="hoduybaoo@gmail.com" disabled className=" px-2 border rounded outline-none shadow  text-gray-500 bg-gray-100 h-9 w-[40%]" />
            </div>
            <div className="flex gap-3 items-center">
                <label className="w-[30%] text-right">Address :</label>
                <input type="text" className="px-2 border rounded outline-none shadow  text-gray-600 h-9 w-[40%] focus:border-blue-300" />
            </div>
            <div className="flex gap-3 items-center">
                <label className="w-[30%] text-right">Birthday :</label>
                <input type="date" className="px-2 border rounded outline-none shadow  text-gray-600 h-9 w-[40%] focus:border-blue-300" />
            </div>
            <div className="flex gap-3">
                <label className="w-[30%] text-right">Introduce :</label>
                <div className="w-[40%] flex flex-col items-end">
                <textarea  className="px-2 resize-none w-full border rounded outline-none shadow break-words text-gray-600 h-[100px] pt-1 focus:border-blue-300" />
                <button className="text-sm rounded bg-purple-700 hover:bg-purple-900 h-9 text-white px-3 mt-4">
                Save changes
              </button>
                </div>
            </div>

           



        </div>

      </div>
    </div>
  );
}

export default Profile;
