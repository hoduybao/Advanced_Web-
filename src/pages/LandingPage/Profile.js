import { MdEdit } from "react-icons/md";
import { VscLoading } from "react-icons/vsc";

import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { updateUser } from "../../store/user/asyncActions";
import Swal from "sweetalert2";

function Profile() {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const { current } = useSelector((state) => state.user);
  const [profile, setProfile] = useState({}); // Bỏ giá trị mặc định là {}
  const [errors, setErrors] = useState("");


  const convertDate = (time) => {
    var due = new Date(time);
    return due.toISOString().split('T')[0];
};

  useEffect(() => {
    // Kiểm tra xem current có giá trị hay không
    if (current) {
      setProfile({ ...current, dateofbirth:current.dateofbirth? convertDate(current.dateofbirth):current.dateofbirth });
    }
  }, [current]);

  const [avatar, setAvatar] = useState(null);
  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "avatar") {
      let value2 = event.target.files[0];
      setAvatar(value2);
      setProfile((prevInputs) => ({
        ...prevInputs,
        [name]: URL.createObjectURL(value2),
      }));
    } else if (name === "fullname") {
      if (value === "") {
        setErrors("Please input your name!");
      } else {
        setErrors("");
      }
      setProfile((prevInputs) => ({ ...prevInputs, [name]: value }));
    } else {
      setProfile((prevInputs) => ({ ...prevInputs, [name]: value }));
    }
  };

  const handleSubmitInfo = (event) => {
    event.preventDefault();

    if (!errors) {
      setLoading(true);
      var formdata = new FormData();
      if (avatar) {
        formdata.append("avatar", avatar);
      }
      formdata.append("fullname", profile.fullname);
      if (profile.address) {
        formdata.append("address", profile.address);
      }

      if (profile.dateofbirth) {
        formdata.append("dateofbirth", profile.dateofbirth);
      }
      if (profile.introduce) {
        formdata.append("introduce", profile.introduce);
      }

      const fetch = async () => {
        dispatch(updateUser(formdata))
          .then((response) => {
            setLoading(false);
            setAvatar(null);
            Swal.fire("Congratulation!", "Update successfully", "success");
            // Thực hiện các thao tác khác sau khi cập nhật thành công
            // notify('success', 'Báo cáo thành công!');
            // handleClose();
          })
          .catch((error) => {
            setLoading(false);
            setAvatar(null);
            Swal.fire("Opps!", "Update failed", "error");
            // Thực hiện các thao tác khác sau khi cập nhật thất bại
            // notify('error', 'Cập nhật thất bại!');
          });

        // if (response.status === 'ok') {
        //   //  notify('success', 'Báo cáo thành công!');
        // }
        //  handleClose();
      };
      fetch();
    }
  };
  return (
    <div className="w-full min-h-screen flex justify-center">
      <div className="w-[65%] bg-white mt-6 rounded-md shadow-md border border-t-[#210035] border-t-4">
        <div className="flex justify-center my-8 gap-8  ">
          <div className="relative">
            <img
              src={profile?.avatar}
              className="border shadow rounded-full h-[120px] w-[120px]"
              alt="avatar"
            />
            <input
              id="upload"
              type="file"
              accept=".jpg,.png"
              onChange={handleChange}
              hidden
              name="avatar"
            />
            <label
              for="upload"
              className="absolute bottom-0 right-1 w-7 h-7 rounded-full flex justify-center items-center bg-purple-700 hover:bg-purple-900 cursor-pointer"
            >
              <MdEdit size={16} color="#fff" />
            </label>
          </div>

          <div className="flex flex-col justify-center">
            <h1 className="text-xl font-medium"> {profile?.fullname}</h1>
            <h4 className="text-gray-700">Email: {profile?.email}</h4>
          </div>
        </div>
        <div className="w-full py-2 px-5 bg-slate-100 bg-[rgba(245, 246, 250,1)] text-slate-600 shadow ">
          Account
        </div>
        <div className="mt-8 flex flex-col gap-7">
          <div className={!errors ? "flex gap-3 items-center" : "flex gap-3"}>
            <label className="w-[30%] text-right">
              <span className="text-red-600 text-lg">* </span>Name :
            </label>
            <div className="w-[40%] flex flex-col">
              <input
                type="text"
                name="fullname"
                value={profile?.fullname}
                onChange={handleChange}
                className=" px-2 border rounded outline-none shadow  text-gray-600 h-9 focus:border-blue-300"
              />
              {errors && (
                <span className="text-red-500 mt-[2px]">{errors}</span>
              )}
            </div>
          </div>

          <div className="flex gap-3 items-center">
            <label className="w-[30%] text-right">Email :</label>
            <input
              type="text"
              value={profile?.email}
              disabled
              className=" px-2 border rounded outline-none shadow  text-gray-500 bg-gray-100 h-9 w-[40%]"
            />
          </div>
          <div className="flex gap-3 items-center">
            <label className="w-[30%] text-right">Address :</label>
            <input
              name="address"
              value={profile?.address}
              onChange={handleChange}
              type="text"
              className="px-2 border rounded outline-none shadow  text-gray-600 h-9 w-[40%] focus:border-blue-300"
            />
          </div>
          <div className="flex gap-3 items-center">
            <label className="w-[30%] text-right">Birthday :</label>
            <input
              name="dateofbirth"
              value={profile?.dateofbirth}
              onChange={handleChange}
              type="date"
              className="px-2 border rounded outline-none shadow  text-gray-600 h-9 w-[40%] focus:border-blue-300"
            />
          </div>
          <div className="flex gap-3">
            <label className="w-[30%] text-right">Introduce :</label>
            <div className="w-[40%] flex flex-col items-end">
              <textarea
                name="introduce"
                value={profile?.introduce}
                onChange={handleChange}
                className="px-2 resize-none w-full border rounded outline-none shadow break-words text-gray-600 h-[100px] pt-1 focus:border-blue-300"
              />
              <button
                onClick={handleSubmitInfo}
                className="text-sm rounded py-[8px]  min-w-[140px]  min-h-[36px] bg-purple-700 hover:bg-purple-900 h-9 text-white px-3 mt-4 flex justify-center"
              >
                {loading ? (
                  <div className="animate-spin">
                    <VscLoading size={22} />
                  </div>
                ) : (
                  "Save changes"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
