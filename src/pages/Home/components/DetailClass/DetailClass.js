import { Avatar, Tabs } from "antd";
import TabPane from "antd/es/tabs/TabPane";

function DetailClass() {
  return (
    <div className="px-4 ml-64">
      <Tabs
        defaultActiveKey="1"
        indicatorSize={(origin) => origin + 20}
        className="w-full"
      >
        <TabPane key="1" tab="News">
          <div>News</div>
        </TabPane>
        <TabPane key="2" tab="Everyone">
          <div className="w-full flex justify-center">
            <div className="w-3/5 mt-10">
              <div className="text-[30px] font-normal border-x-0 border-t-0 border border-black pb-2 ">
                Teacher
              </div>
              <div className="flex gap-4 items-center border-x-0 border-t-0 border  py-4">
                <Avatar src="https://lh3.googleusercontent.com/a-/ALV-UjWNBqAYDUqhR_2Z3530GvGQMDKxyPWPi0ofscvkVTDCVA=s32-c" size={35} />
                <div className="text-sm font-medium">Hồ Duy Bảo</div>
              </div>
              <div className="flex gap-4 items-center mt-4">
                <Avatar src="https://lh3.googleusercontent.com/a-/ALV-UjWNBqAYDUqhR_2Z3530GvGQMDKxyPWPi0ofscvkVTDCVA=s32-c" size={35} />
                <div className="text-sm font-medium">Hồ Duy Bảo</div>
              </div>
              <div className=" border-x-0 border-t-0 border border-black pb-2 mt-10 flex items-center justify-between">
                <div className="text-[30px] font-normal">Student</div>
                <div className="text-sm font-medium">94 students</div>

              </div>
              <div className="flex gap-4 items-center border-x-0 border-t-0 border  py-4">
                <Avatar src="https://lh3.googleusercontent.com/a-/ALV-UjWNBqAYDUqhR_2Z3530GvGQMDKxyPWPi0ofscvkVTDCVA=s32-c" size={35} />
                <div className="text-sm font-medium">Hồ Duy Bảo</div>
              </div>
              <div className="flex gap-4 items-center border-x-0 border-t-0 border  py-4">
                <Avatar src="https://lh3.googleusercontent.com/a-/ALV-UjWNBqAYDUqhR_2Z3530GvGQMDKxyPWPi0ofscvkVTDCVA=s32-c" size={35} />
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
