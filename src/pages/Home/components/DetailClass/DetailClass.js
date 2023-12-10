import { Button, Dropdown, Form, Input, Modal, Spin, Tabs } from "antd";
import { useNavigate } from "react-router-dom";

import TabPane from "antd/es/tabs/TabPane";
import { useEffect, useState } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { IoPersonAdd } from "react-icons/io5";

import { useParams } from "react-router-dom";
import ApiClass from "../../../../utils/api/class";
import notify from "../../../../utils/toast";
import Toast from "../../../../components/Toast";
import { useSelector } from "react-redux";



function DetailClass() {
  const [loading, setLoading] = useState(true);
  const [detailsClass, setDetailsClass] = useState(null);
  const [openInvite, setOpenInvite] = useState(false);
  const [typeInvite, setTypeInvite] = useState("");

  const navigate = useNavigate();
  const { isLoggin, current } = useSelector((state) => state.user);
  const params = useParams();

  const slug = params.name;

  useEffect(() => {
    if (!isLoggin) {
      navigate("/auth/login");
    }
  }, [isLoggin]);
  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      let response = await ApiClass.getDetailClass(`class/detail/${slug}`);

      console.log(response);
      if (response.success) {
        setDetailsClass(response.data);
        setLoading(false);
      } else {
        setLoading(false);
      }
    };
    fetch();
  }, [slug]);

  const handleCopyClick = (type) => {
    if (type === "class code") {
      if ("clipboard" in navigator) {
        notify("success", "Copied the class code");
        return navigator.clipboard.writeText(detailsClass.invitationCode);
      } else {
        return document.execCommand("copy", true, detailsClass.invitationCode);
      }
    } else {
      if ("clipboard" in navigator) {
        notify("success", "Copied the link class");
        return navigator.clipboard.writeText(
          process.env.MY_URL_PUBLIC +
          "join-class/" +
          detailsClass.slug +
          "?code=" +
          detailsClass.invitationCode
        );
      } else {
        return document.execCommand(
          "copy",
          true,
          process.env.MY_URL_PUBLIC +
          "join-class/" +
          detailsClass.slug +
          "?code=" +
          detailsClass.invitationCode
        );
      }
    }
  };

  const handleInvite = (values) => {
    const fetch = async () => {
      let response = await ApiClass.invitePeople(`class/invite`, {
        email: values.email,
        slug: detailsClass.slug,
        role: typeInvite,
      });
      if (response.success) {
        setOpenInvite(false);
      } else {
        notify("error", "This person has been added to the class!");
      }
    };
    fetch();
  };
  const checkIsTeacher = () => {
    return detailsClass.teacherList.some(
      (element) => element._id === current._id
    );
  };
  const items = [
    {
      key: "1",
      label: (
        <div
          className="text-base"
          onClick={() => handleCopyClick("class code")}
        >
          Copy class code
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div
          className="text-base"
          onClick={() => handleCopyClick("link class")}
        >
          Copy the class invitation link
        </div>
      ),
    },
  ];

  return (
    <div className="px-4 ml-64">
      <Toast />

      <Tabs
        defaultActiveKey="1"
        indicatorSize={(origin) => origin + 20}
        className="w-full text-black"
      >
        <TabPane key="1" className="text-black" tab="News">
          <div className="w-full flex justify-center min-h-screen relative">
            {loading ? (
              <div className="absolute top-1/2 left-1/2">
                <Spin />
              </div>
            ) : (
              <div className="w-4/5 mt-10 flex flex-col gap-6">
                <div className="w-full relative">
                  <img
                    alt="cover_image"
                    className="!w-full !h-[240px] object-fill rounded-lg"
                    style={{ width: "100%" }}
                    src="https://i.pinimg.com/564x/fa/d6/0e/fad60ef170c7daf8d6ab9cb4f4dbf7c2.jpg"
                  />
                  <div
                    className="absolute w-full h-full  opacity-50 top-0 left-0 rounded-lg"
                    style={{
                      background:
                        "linear-gradient(rgb(32,33,36) 30%,rgb(32,33,36))",
                    }}
                  ></div>
                  <div className="absolute bottom-6 left-7 text-white text-[24px] font-medium z-10">
                    {detailsClass?.title}
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-[190px] flex flex-col gap-6">
                    {checkIsTeacher() && (
                      <div className="p-4 border rounded-lg w-[190px] flex flex-col gap-2 relative">
                        <div className="font-normal text-base">Class code</div>
                        <div className="font-medium text-xl">
                          {detailsClass?.invitationCode}
                        </div>
                        <Dropdown
                          trigger={["click"]}
                          menu={{
                            items,
                          }}
                          placement="bottomLeft"
                          arrow={{
                            pointAtCenter: true,
                          }}
                        >
                          <Button
                            shape="circle"
                            className="absolute right-3 top-3 text-xl text-black !border-none hover:bg-gray-300 hover:text-black"
                            icon={
                              <CiMenuKebab width={30} height={30} color="black" />
                            }
                          ></Button>
                        </Dropdown>
                      </div>
                    )}

                    <div className="p-4 border rounded-lg flex flex-col gap-2 relative">
                      <div className="font-normal text-base">Grade Structure</div>
                      <div className="font-medium text-xl">
                        <p className="text-sm mb-2 text-green">There is no grade structure yet</p>
                      </div>
                      {checkIsTeacher() && (
                        <Button
                          shape="circle"
                          className="absolute right-3 top-3 text-xl text-black !border-none hover:bg-gray-300 hover:text-black">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                          </svg>
                        </Button>
                      )}
                    </div>
                  </div>
                  <div className="flex-grow">
                    <div className="relative bg-white p-4 rounded-md shadow-md border">
                      <div className="bg-white-500 text-black py-2 px-4 rounded-t-md -ml-4 flex flex-row items-center justify-between">
                        <div className="mb-4 flex-grow">
                          <input type="text" className="border rounded-md p-2 w-full" placeholder="Announce something to your class..." />
                        </div>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-md ml-4 -mt-4">Post</button>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            )}
          </div>
        </TabPane>
        <TabPane key="2" tab="Everyone">
          <div className="w-full flex justify-center relative">
            {loading ? (
              <div className="absolute top-1/2 left-1/2">
                <Spin />
              </div>
            ) : (
              <div className="w-3/5 mt-10">
                <div className="flex justify-between  items-center pb-2 border-x-0 border-t-0 border border-black px-2 ">
                  <div className="text-[30px] font-normal ">Teacher</div>
                  {checkIsTeacher() && (
                    <IoPersonAdd
                      size={25}
                      className="cursor-pointer hover:text-blue-500"
                      onClick={() => {
                        setTypeInvite("teacher");
                        setOpenInvite(true);
                      }}
                    />
                  )}
                </div>
                <div className="px-2">
                  {detailsClass?.teacherList.map((element, index) => (
                    <div
                      className={`flex gap-4 items-center py-4 ${index === detailsClass.teacherList.length - 1
                        ? "border-none"
                        : "border-x-0 border-t-0 border"
                        }`}
                    >
                      <img
                        class="h-10 w-10 rounded-full"
                        src={element.avatar}
                        alt=""
                      />
                      <div className="text-sm font-medium">
                        {element.fullname}
                      </div>
                    </div>
                  ))}
                </div>

                <div className=" border-x-0 border-t-0 border border-black pb-2 mt-10 flex items-center justify-between px-2">
                  <div className="text-[30px] font-normal">Student</div>
                  <div className="text-sm font-medium flex flex-end items-end gap-4">
                    <div> {detailsClass?.studentList.length} students</div>
                    {checkIsTeacher() && (
                      <IoPersonAdd
                        size={25}
                        className="cursor-pointer hover:text-blue-500"
                        onClick={() => {
                          setTypeInvite("student");
                          setOpenInvite(true);
                        }}
                      />
                    )}
                  </div>
                </div>
                <div className="px-2">
                  {detailsClass?.studentList.map((element, index) => (
                    <div
                      className={`flex gap-4 items-center  py-4 ${index === detailsClass.teacherList.length - 1
                        ? "border-none"
                        : "border-x-0 border-t-0 border"
                        }`}
                    >
                      <img
                        class="h-10 w-10 rounded-full"
                        src={element.avatar}
                        alt=""
                      />
                      <div className="text-sm font-medium">
                        {element.fullname}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </TabPane>
      </Tabs>
      <Modal
        title={`Invite ${typeInvite}`}
        open={openInvite}
        footer={null}
        closeIcon={null}
      >
        <div className="pr-6">
          <Form
            name="invite"
            labelCol={{
              span: 24,
            }}
            wrapperCol={{
              span: 24,
            }}
            style={{
              maxWidth: 600,
            }}
            onFinish={handleInvite}
            autoComplete="off"
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please enter the email!",
                },
              ]}
            >
              <Input placeholder="Please enter the email" />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                span: 24,
              }}
            >
              <div className="flex justify-end gap-3">
                <Button onClick={() => setOpenInvite(false)}>Cancel</Button>
                <Button
                  type="primary"
                  className="!bg-[#1677FF]"
                  htmlType="submit"
                >
                  Invite
                </Button>
              </div>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </div>
  );
}

export default DetailClass;
