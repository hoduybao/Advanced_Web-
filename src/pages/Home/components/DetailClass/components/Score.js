import {
  MinusCircleOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, Modal, Result, Space, Spin, Table } from "antd";
import { useEffect, useState } from "react";
import ApiClass from "../../../../../utils/api/class";

function Score({ detailsClass }) {
  const [columns, setColumns] = useState([]);
  const [openGradeStructure, setOpenGradeStructure] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [allPoint, setAllPoints] = useState({});
  const [dataTable, setDataTable] = useState([]);
  const handleChangeUploadGrade = (event) => {
    const { name } = event.target;
    const file = event.target.files[0];

    const typeGrade = detailsClass.gradeStructure.find(
      (element) => element.title === name
    );
    const idTypeGrade = typeGrade._id;
    var formdata = new FormData();
    formdata.append("file", file);

    const fetch = async () => {
      setIsLoading(true);
      let response = await ApiClass.createGradeStructure(
        `grade/upload-grades/${detailsClass.slug}/${idTypeGrade}`,
        formdata
      );
      setIsLoading(false);
    };
    fetch();
  };

  const handleGradeStructure = (values) => {
    const fetch = async () => {
      setIsLoading(true);
      let response = await ApiClass.createGradeStructure(
        `class/gradeStructure/${detailsClass.slug}`,
        values.gradeStructure
      );

      setIsLoading(false);
    };
    fetch();
    setOpenGradeStructure(false);
  };

  const getAllPoints = async () => {
    setIsLoading(true);
    let response = await ApiClass.getAllPointClass(
      `grade/getAllPoint/${detailsClass.slug}`
    );
    setColumns((prev) => {
      let newColums = [
        {
          title: "ID",
          dataIndex: "id",
          key: "id",
        },
        {
          title: "Name",
          dataIndex: "name",
          key: "name",
        },
      ];
      for (let i = 0; i < response.data?.gradeStructure?.length; i++) {
        newColums.push({
          title: (
            <Space className="flex justify-between">
              {response?.data.gradeStructure[i].title}
              <input
                id="upload"
                type="file"
                accept=".csv"
                onChange={() => handleChangeUploadGrade}
                hidden
                name={response?.data.gradeStructure[i].title}
              />
              <label for="upload">
                <UploadOutlined />
              </label>
            </Space>
          ),
          dataIndex: response?.data.gradeStructure[i].title,
          key: response?.data.gradeStructure[i].title,
        });
      }
      newColums.push({
        title: "GPA",
        dataIndex: "GPA",
        key: "GPA",
      });

      return newColums;
    });

    setDataTable((prev) => {
      let dataTable = [];
      if (response.data?.studentGrades) {
        for (let i = 0; i < response.data?.studentGrades?.length; i++) {
          var dataPoint = {};
          for (let j = 0; j < response.data?.studentGrades[i].grades.length; j++) {
            dataPoint[response.data?.studentGrades[i].grades[j].columnName] =
              dataPoint[response.data?.studentGrades[i].grades[j].point];
          }
          dataTable.push({
            id: response.data?.studentGrades[i].dataStudent.IDStudent,
            name: response.data?.studentGrades[i].dataStudent.fullname,
            ...dataPoint,
            GPA: response.data?.studentGrades.averagePoint,
          });
        }
      }

      return dataTable;
    });

    setAllPoints(response.data);
    setIsLoading(false);
  };
  useEffect(() => {
    getAllPoints();
  }, []);

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
        {isLoading ? (
          <div className="absolute top-1/2 left-1/2">
            <Spin />
          </div>
        ) : (
          <Table
            columns={columns}
            dataSource={dataTable}
            pagination={{
              position: ["bottomCenter"],
            }}
          />
        )}
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
