import { Avatar, Button, Dropdown, Image, Tabs } from "antd";
import TabPane from "antd/es/tabs/TabPane";
import { CiMenuKebab } from "react-icons/ci";

const items = [
  {
    key: "1",
    label: <div className="text-base">Copy class code</div>,
  },
  {
    key: "2",
    label: <div className="text-base">Copy the class invitation link</div>,
  },
];
function DetailClass() {
  return (
    <div className="px-4 ml-64">
      <Tabs
        defaultActiveKey="1"
        indicatorSize={(origin) => origin + 20}
        className="w-full text-black"
      >
        <TabPane key="1" className="text-black" tab="News">
          <div className="w-full flex justify-center">
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
                  Phát triển ứng dụng Web nâng cao - 20_3
                </div>
              </div>
              <div className="flex gap-6">
                <div className="flex gap-6">
                  <div className="p-4 border rounded-lg w-[190px] flex flex-col gap-2 relative">
                    <div className="font-normal text-base">Class code</div>
                    <div className="font-medium text-xl">jkvtqnk</div>
                    <Dropdown
                    trigger={['click']}
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
                        icon={<CiMenuKebab width={30} height={30} color="black" />}
                      ></Button>
                    </Dropdown>
                  </div>
                </div>
                <div></div>
                
              </div>
            </div>
          </div>
        </TabPane>
        <TabPane key="2" tab="Everyone">
          <div className="w-full flex justify-center">
            <div className="w-3/5 mt-10">
              <div className="text-[30px] font-normal border-x-0 border-t-0 border border-black pb-2 ">
                Teacher
              </div>
              <div className="flex gap-4 items-center border-x-0 border-t-0 border  py-4">
                <Avatar
                  src="https://lh3.googleusercontent.com/a-/ALV-UjWNBqAYDUqhR_2Z3530GvGQMDKxyPWPi0ofscvkVTDCVA=s32-c"
                  size={35}
                />
                <div className="text-sm font-medium">Hồ Duy Bảo</div>
              </div>
              <div className="flex gap-4 items-center mt-4">
                <Avatar
                  src="https://lh3.googleusercontent.com/a-/ALV-UjWNBqAYDUqhR_2Z3530GvGQMDKxyPWPi0ofscvkVTDCVA=s32-c"
                  size={35}
                />
                <div className="text-sm font-medium">Hồ Duy Bảo</div>
              </div>
              <div className=" border-x-0 border-t-0 border border-black pb-2 mt-10 flex items-center justify-between">
                <div className="text-[30px] font-normal">Student</div>
                <div className="text-sm font-medium">94 students</div>
              </div>
              <div className="flex gap-4 items-center border-x-0 border-t-0 border  py-4">
                <Avatar
                  src="https://lh3.googleusercontent.com/a-/ALV-UjWNBqAYDUqhR_2Z3530GvGQMDKxyPWPi0ofscvkVTDCVA=s32-c"
                  size={35}
                />
                <div className="text-sm font-medium">Hồ Duy Bảo</div>
              </div>
              <div className="flex gap-4 items-center border-x-0 border-t-0 border  py-4">
                <Avatar
                  src="https://lh3.googleusercontent.com/a-/ALV-UjWNBqAYDUqhR_2Z3530GvGQMDKxyPWPi0ofscvkVTDCVA=s32-c"
                  size={35}
                />
                <div className="text-sm font-medium">Hồ Duy Bảo</div>
              </div>
            </div>
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
}

export default DetailClass;
