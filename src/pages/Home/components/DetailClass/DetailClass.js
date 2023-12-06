import { Tabs } from "antd";
import TabPane from "antd/es/tabs/TabPane";

function DetailClass() {
  return (
    <div className="p-4">
      <Tabs defaultActiveKey="1" indicatorSize={(origin) => origin - 16}>
        <TabPane key="1">a</TabPane>
        <TabPane key="2">b</TabPane>
      </Tabs>
    </div>
  );
}

export default DetailClass;
