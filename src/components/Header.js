import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo.svg";
import path from "../utils/path";
import { BiLogIn } from "react-icons/bi";
import { PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCurrent } from "../store/user/asyncActions";
import { logout, clearMessage } from "../store/user/userSlice";

import ApiClass from "../utils/api/class";
import Swal from "sweetalert2";
import { Button, Input, Modal, Popover, Form } from "antd";
import { io } from "socket.io-client"

const { TextArea } = Input;

function Header({ currentPage, onSwitchPage }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [openPopover, setOpenPopover] = useState(false);
  const { isLoggin, current, mes } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [openCreateClass, setOpenCreateClass] = useState(false);
  const [openJoinClass, setOpenJoinClass] = useState(false);


  const getAllNotify = async () => {
    let response = await ApiClass.getAllNotify(
      `notification/getAllNotify`
    );
    console.log(response)
  };


  useEffect(() => {
    const socket = io('http://localhost:5000/');
    socket.on("newNotify", (data) => {
      if (data.success) {
        getAllNotify();
      }
    });

    return () => {
      console.log("Disconnecting from Socket.IO server");
      socket.disconnect();
    };
  }, []);

  const handleOk = (values) => {
    const fetch = async () => {
      setLoading(true);
      let response = await ApiClass.newClass(`class/create`, values);
      if (response.success) {
        navigate(`/class/${response.data.slug}`);
        setLoading(false);
      } else {
        setLoading(false);
      }
    };
    fetch();
    setOpenCreateClass(false);
  };
  const handleJoinOk = (values) => {
    const fetch = async () => {
      setLoading(true);
      let response = await ApiClass.joinClass(`class/join/${values.classCode}`);
      if (response.success) {
        navigate(`/class/${response.data.slug}`);
        setLoading(false);
      } else {
        setLoading(false);
      }
    };
    fetch();
    setOpenJoinClass(false);
  };

  useEffect(() => {
    if (!isLoggin) {
      if (mes) {
        Swal.fire("Oops!", mes, "info").then(() => {
          dispatch(clearMessage());
          navigate("/auth/login");
        });
      } else {
        if (location.pathname !== "/") {
          navigate("/auth/login");
        }
      }
    }
  }, [isLoggin]);

  useEffect(() => {
    if (isLoggin) {
      dispatch(getCurrent());
    }
  }, [dispatch, isLoggin]);

  // useEffect(() => {

  //   const getUser = () => {
  //     fetch("http://localhost:8080/api/auth/login/success", {
  //       method: "GET",
  //       credentials: "include",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //         "Access-Control-Allow-Credentials": true,
  //       },
  //     })
  //       .then((response) => {
  //         if (response.status === 200) return response.json();
  //         throw new Error("authentication has been failed!");
  //       })
  //       .then((resObject) => {
  //         dispatch(
  //           login({
  //             isLoggin: true,
  //             token: resObject.accessToken,
  //             userData: resObject.userData,
  //           })
  //         );
  //         console.log(resObject.userData);
  //         //setUser(resObject.user);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   };
  //   getUser();

  // }, []);

  const handleSwitch = () => {
    if (currentPage === "login") {
      onSwitchPage("register");
    } else if (currentPage === "register") {
      onSwitchPage("login");
    }
  };

  const handleProfileClick = () => {
    setIsProfileOpen(!isProfileOpen);
  };
  const handleOpenChange = (newOpen) => {
    setOpenPopover(newOpen);
  };

  return (
    <div className="flex justify-center w-full h-[56px] bg-[#210035] fixed z-10">
      <div className="w-main flex justify-between items-center h-full">
        <Link to={`/${path.HOME}`}>
          <img src={logo} alt="logo" className="cursor-pointer w-[58px]" />
        </Link>
        {currentPage === "login" && (
          <Link to="/auth/register" onClick={() => handleSwitch()}>
            <button className="flex justify-center gap-2 text-sm rounded items-center bg-purple-900 hover:bg-white hover:text-black h-8 text-white px-5">
              <BiLogIn size={20} />
              <span>Register</span>
            </button>
          </Link>
        )}
        {currentPage === "register" && (
          <Link to="/auth/login" onClick={() => handleSwitch()}>
            <button className="flex justify-center gap-2 text-sm rounded items-center bg-purple-900 hover:bg-white hover:text-black h-8 text-white px-5">
              <BiLogIn size={20} />
              <span>Login</span>
            </button>
          </Link>
        )}

        {currentPage !== "register" && currentPage !== "login" && !isLoggin && (
          <Link to="/auth/login">
            <button className="flex justify-center gap-2 text-sm rounded items-center bg-purple-900 hover:bg-white hover:text-black h-8 text-white px-5">
              <BiLogIn size={20} />
              <span>Login</span>
            </button>
          </Link>
        )}

        {isLoggin && (
          <div className="flex justify-end items-center gap-2">
            <Popover
              content={
                <div className="flex flex-col text-base gap-2 w-full py-2">
                  <div
                    onClick={() => {
                      setOpenPopover(false);
                      setOpenCreateClass(true);
                    }}
                    className="text-base py-2 px-4 cursor-pointer hover:bg-gray-100 "
                  >
                    Create the class
                  </div>
                  <div
                    onClick={() => {
                      setOpenPopover(false);
                      setOpenJoinClass(true);
                    }}
                    className="text-base  py-2 px-4 cursor-pointer hover:bg-gray-100"
                  >
                    Join the class
                  </div>
                </div>
              }
              trigger="click"
              open={openPopover}
              onOpenChange={handleOpenChange}
            >
              <Button
                shape="circle"
                className="!bg-white"
                icon={<PlusOutlined />}
              ></Button>
            </Popover>
            <div class="relative ml-3">
              <div>
                <button
                  type="button"
                  class="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  id="user-menu-button"
                  aria-expanded="false"
                  aria-haspopup="true"
                  onClick={() => handleProfileClick()}
                >
                  <img
                    class="h-10 w-10 rounded-full"
                    src={current?.avatar}
                    alt=""
                  />
                </button>
              </div>
              {isProfileOpen && (
                <div
                  class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu-button"
                  tabindex="-1"
                >
                  <Link
                    to={"/profile"}
                    className="block px-4 py-2 text-sm hover:bg-gray-100 text-gray-700"
                    role="menuitem"
                    tabindex="-1"
                    id="user-menu-item-0"
                  >
                    My Profile
                  </Link>
                  <div
                    onClick={() => {
                      // window.open(
                      //   "https://bth-classroom.onrender.com/api/auth/logout",
                      //   "_self"
                      // );
                      dispatch(logout());
                    }}
                    className="block px-4 py-2 text-sm hover:bg-gray-100 text-gray-700 cursor-pointer"
                    role="menuitem"
                    tabindex="-1"
                    id="user-menu-item-2"
                  >
                    Sign out
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <Modal
        title="Create new class"
        open={openCreateClass}
        footer={null}
        closeIcon={null}
      >
        <div className="pr-6">
          <Form
            name="createClass"
            labelCol={{
              span: 24,
            }}
            wrapperCol={{
              span: 24,
            }}
            style={{
              maxWidth: 600,
            }}
            onFinish={handleOk}
            autoComplete="off"
          >
            <Form.Item
              label="Class name"
              name="title"
              rules={[
                {
                  required: true,
                  message: "Please input your class name!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Description"
              name="subTitle"
              rules={[
                {
                  required: true,
                  message: "Please enter a description of your class!",
                },
              ]}
            >
              <TextArea rows={3} />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                span: 24,
              }}
            >
              <div className="flex justify-end gap-3">
                <Button onClick={() => setOpenCreateClass(false)}>
                  Cancel
                </Button>
                <Button
                  type="primary"
                  className="!bg-[#1677FF]"
                  htmlType="submit"
                >
                  Submit
                </Button>
              </div>
            </Form.Item>
          </Form>
        </div>
      </Modal>
      <Modal
        title="Join the class"
        open={openJoinClass}
        footer={null}
        closeIcon={null}
      >
        <div className="pr-6">
          <Form
            name="joinClass"
            labelCol={{
              span: 24,
            }}
            wrapperCol={{
              span: 24,
            }}
            style={{
              maxWidth: 600,
            }}
            onFinish={handleJoinOk}
            autoComplete="off"
          >
            <Form.Item
              label="Class code"
              name="classCode"
              rules={[
                {
                  required: true,
                  message: "Please input the class code!",
                },
              ]}
            >
              <Input placeholder="Please enter the class code you want to join" />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                span: 24,
              }}
            >
              <div className="flex justify-end gap-3">
                <Button onClick={() => setOpenJoinClass(false)}>Cancel</Button>
                <Button
                  type="primary"
                  className="!bg-[#1677FF]"
                  htmlType="submit"
                >
                  Submit
                </Button>
              </div>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </div>
  );
}

export default Header;
