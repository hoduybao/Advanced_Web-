import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, InputNumber, Modal, Space, Table } from "antd";
import { useState } from "react";
import ApiClass from "../../../../../utils/api/class";

function Score({ detailsClass }) {
  const columns = [
    {
      title: "ID",
      dataIndex: "ID",
      key: "ID",
    },
    {
      title: "Name",
      dataIndex: "Name",
      key: "Name",
    },
    {
      title: "Process",
      dataIndex: "Process",
      key: "Process",
    },
    {
      title: "Midterm",
      dataIndex: "Midterm",
      key: "Midterm",
    },
    {
      title: "Final",
      dataIndex: "Final",
      key: "Final",
    },
    {
      title: "GPA",
      key: "GPA",
      dataIndex: "GPA",
    },
  ];
  const data = [
    {
      key: "1",
      ID: "20120433",
      Name: "Duy Bao",
      Process: 5.0,
      Midterm: 9.0,
      Final: 8.5,
      GPA: 8.0,
    },
    {
      key: "2",
      ID: "20120376",
      Name: "Duy That",
      Process: 5.0,
      Midterm: 9.0,
      Final: 8.5,
      GPA: 8.0,
    },
    {
      key: "3",
      ID: "20120420",
      Name: "Duy Quang",
      Process: 5.0,
      Midterm: 9.0,
      Final: 8.5,
      GPA: 8.0,
    },
  ];

  const [openGradeStructure, setOpenGradeStructure] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleGradeStructure = (values) => {

    const fetch = async () => {
      setIsLoading(true);
      let response = await ApiClass.createGradeStructure(`class/gradeStructure/${detailsClass.slug}`,values.gradeStructure);

      setIsLoading(false);
    };
    fetch();
    setOpenGradeStructure(false);
  };

  return (
    <div className="w-full flex justify-center min-h-screen relative">
      <div className="mt-10 mx-4 w-full">
        <div className="flex justify-end mb-4">
          <Button
            className="border-[#355ED4] text-[#355ED4] text-base font-medium h-9"
            onClick={() => setOpenGradeStructure(true)}
          >
            Grade Structure
          </Button>
        </div>
        <Table
          columns={columns}
          dataSource={data}
          pagination={{
            position: ["bottomCenter"],
          }}
        />
      </div>
      <Modal open={openGradeStructure} footer={null} closeIcon={null}>
        <div className="pr-2">
          <Form
            name="gradeStructure"
            labelCol={{
              span: 24,
            }}
            wrapperCol={{
              span: 24,
            }}
            style={{
              maxWidth: 600,
            }}
            onFinish={handleGradeStructure}
            autoComplete="off"
          >
            <div className="text-lg mb-5">Grade structure</div>

            <Form.List
              name="gradeStructure"
               initialValue={detailsClass.gradeStructure}
            
            >
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <div
                      key={key}
                      className="flex gap-2 items-center justify-between"
                    >
                      <Form.Item
                        className="flex-1"
                        {...restField}
                        name={[name, "title"]}
                        rules={[
                          {
                            required: true,
                            message: "Missing title",
                          },
                        ]}
                      >
                        <Input placeholder="title" className="w-[220px]" />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, "grade"]}
                        rules={[
                          {
                            required: true,
                            message: "Missing grade",
                          },
                        ]}
                      >
                        <Input
                          type="number"
                          placeholder="grade"
                          className="w-[190px]"
                        />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, "_id"]}
                        initialValue=""
                      >
                        <Input placeholder="id" className="hidden" />
                      </Form.Item>
                      <Form.Item>
                        <MinusCircleOutlined onClick={() => remove(name)} />
                      </Form.Item>
                    </div>
                  ))}
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      block
                      icon={<PlusOutlined />}
                    >
                      Add score column
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>

            <Form.Item
              wrapperCol={{
                span: 24,
              }}
            >
              <div className="flex justify-end gap-3">
                <Button onClick={() => setOpenGradeStructure(false)}>
                  Cancel
                </Button>
                <Button
                  type="primary"
                  className="!bg-[#1677FF]"
                  htmlType="submit"
                  loading={isLoading}
                >
                  Save
                </Button>
              </div>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </div>
  );
}

export default Score;
