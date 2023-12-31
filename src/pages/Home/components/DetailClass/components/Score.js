import {
  DownloadOutlined,
  MinusCircleOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, Form, Input, Modal, Space, Spin, Table } from "antd";
import { useEffect, useState } from "react";
import ApiClass from "../../../../../utils/api/class";
import { CiMenuKebab } from "react-icons/ci";
import { MdOutlinePublic, MdOutlineRateReview } from "react-icons/md";

import Papa from "papaparse";
import { useSelector } from "react-redux";
import ApiStudent from "../../../../../utils/api/student";
import TextArea from "antd/es/input/TextArea";

function Score({ detailsClass }) {
  const [columns, setColumns] = useState([]);
  const [openGradeStructure, setOpenGradeStructure] = useState(false);
  const [openReviewResult, setOpenReviewResult] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [allPoint, setAllPoints] = useState({});
  const [myPoint, setMyPoints] = useState({});
  const [dataTable, setDataTable] = useState([]);

  const [dataModalReview,setDataModalReview]=useState({});
  const { current } = useSelector((state) => state.user);

  const [form]=Form.useForm();


  const handleChangeUploadGrade = (event) => {
    const { name } = event.target;
    const file = event.target.files[0];

    const typeGrade = detailsClass.gradeStructure.find(
      (element) => element.title === name
    );
    const idTypeGrade = typeGrade._id;
    console.log(idTypeGrade);
    var formdata = new FormData();
    formdata.append("file", file);

    const fetch = async () => {
      let response = await ApiClass.upLoadGrade(
        `grade/upload-grades/${detailsClass.slug}/${idTypeGrade}`,
        formdata
      ).then((response) => {
        getAllPoints();
      });
    };
    fetch();
  };
  const handleExportScore = (name) => {
    const scoreBoard = [];
    for (let i = 0; i < allPoint.studentGrades?.length; i++) {
      scoreBoard.push({
        mssv: allPoint.studentGrades[i].dataStudent.IDStudent,
        grade: allPoint.studentGrades[i].grades.find(
          (item) => item.columnName === name
        ).point,
      });
    }
    const csv = Papa.unparse(scoreBoard, {
      header: false,
      quotes: true,
    });

    // Tạo một Blob từ chuỗi CSV
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });

    // Tạo một đường dẫn URL cho Blob
    const url = URL.createObjectURL(blob);

    // Tạo một thẻ a để tạo và tải tệp CSV
    const a = document.createElement("a");
    a.href = url;
    a.download = `${name}.csv`;
    a.click();

    // Giải phóng URL đối tượng
    URL.revokeObjectURL(url);
  };

  const handleExportGradeBoard = () => {
    const csv = Papa.unparse(dataTable);

    // Tạo một Blob từ chuỗi CSV
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });

    // Tạo một đường dẫn URL cho Blob
    const url = URL.createObjectURL(blob);

    // Tạo một thẻ a để tạo và tải tệp CSV
    const a = document.createElement("a");
    a.href = url;
    a.download = `${detailsClass.title}.csv`;
    a.click();

    // Giải phóng URL đối tượng
    URL.revokeObjectURL(url);
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
  const handleSendReviewResult = (values) => {
    const fetch = async () => {
       await ApiStudent.sendReviewResult(
        `grade-review/post-grade-review/`,
        {
          "_idgradestructure": dataModalReview._idgradestructure,
          "oldPoint": values.oldPoint,
          "expectedPoint": values.expectedPoint,
          "studentExplanation": values.studentExplanation
      }
      );

    };
    fetch();
  };
  

  const handleFinalizeScore = (id) => {
    const fetch = async () => {
      let response = await ApiClass.finalizeGrade(
        `class/finalize-grade/${detailsClass.slug}/${id}`
      );
    };
    fetch();
  };
  const getAllPoints = async () => {
    setIsLoading(true);
    let response = await ApiClass.getAllPointClass(
      `grade/getAllPoint/${detailsClass.slug}`
    );
    setAllPoints(response.data);

    setIsLoading(false);
  };
  const getMyPoint = async () => {
    setIsLoading(true);
    let response = await ApiStudent.getGradeOfClass(
      `grade/grade-student/${detailsClass.slug}`
    );
    setMyPoints(response.data);

    setIsLoading(false);
  };
  const checkIsTeacher = () => {
    return detailsClass.teacherList.some(
      (element) => element._id === current._id
    );
  };
  useEffect(() => {
    if (checkIsTeacher()) {
      if (Object.keys(allPoint).length === 0) {
        getAllPoints();
      } else {
        setColumns((prev) => {
          let newColums = [
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
          ];
          for (let i = 0; i < allPoint?.gradeStructure?.length; i++) {
            const items = [
              {
                key: 1,
                label: (
                  <div className="text-sm flex gap-2 items-center">
                    <input
                      id={allPoint.gradeStructure[i].title}
                      type="file"
                      accept=".csv"
                      onChange={handleChangeUploadGrade}
                      hidden
                      name={allPoint.gradeStructure[i].title}
                    />
                    <label for={allPoint.gradeStructure[i].title}>
                      <UploadOutlined />
                    </label>
                    <label for={allPoint.gradeStructure[i].title}>
                      Upload score
                    </label>
                  </div>
                ),
              },
              {
                key: 2,
                label: (
                  <div
                    className="text-sm flex gap-2 items-center"
                    onClick={() =>
                      handleExportScore(allPoint.gradeStructure[i].title)
                    }
                  >
                    <div>
                      <DownloadOutlined />
                    </div>
                    <div>Export score</div>
                  </div>
                ),
              },
              {
                key: 3,
                label: (
                  <div
                    className="text-sm flex gap-2 items-center"
                    onClick={() =>
                      handleFinalizeScore(allPoint.gradeStructure[i]._id)
                    }
                  >
                    <div>
                      <MdOutlinePublic />
                    </div>
                    <div>Public score</div>
                  </div>
                ),
              },
            ];
            newColums.push({
              title: (
                <Space className="flex justify-between">
                  {allPoint.gradeStructure[i].title}
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
                </Space>
              ),
              dataIndex: allPoint.gradeStructure[i].title,
              key: allPoint.gradeStructure[i].title,
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
          if (allPoint?.studentGrades) {
            for (let i = 0; i < allPoint?.studentGrades?.length; i++) {
              var dataPoint = {};
              for (
                let j = 0;
                j < allPoint?.studentGrades[i].grades.length;
                j++
              ) {
                dataPoint[allPoint?.studentGrades[i].grades[j].columnName] =
                  allPoint?.studentGrades[i].grades[j].point;
              }
              dataTable.push({
                ID: allPoint?.studentGrades[i].dataStudent.IDStudent,
                Name: allPoint?.studentGrades[i].dataStudent.fullname,
                ...dataPoint,
                GPA: allPoint?.studentGrades[i].averagePoint,
              });
            }
          }

          return dataTable;
        });
      }
    } else {
      if (Object.keys(myPoint).length === 0) {
        getMyPoint();
      } else {
        setColumns((prev) => {
          let newColums = [
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
          ];
          for (let i = 0; i < myPoint?.studentGrades[0].grades?.length; i++) {
            const items = [
              {
                key: 1,
                label: (
                  <div
                    className="text-sm flex gap-2 items-center"
                    onClick={() => {
                      form.setFieldValue('title',myPoint?.studentGrades[0].grades[i].columnName);
                      form.setFieldValue('oldPoint',myPoint?.studentGrades[0].grades[i].point)
                      setDataModalReview({
                        _idgradestructure: myPoint?.studentGrades[0].grades[i]._id,
                      })
                      setOpenReviewResult(true)}}
                  >
                    <div>
                      <MdOutlineRateReview />
                    </div>
                    <div>Review result</div>
                  </div>
                ),
              },
            ];
            newColums.push({
              title: (
                <Space className="flex justify-between">
                  {myPoint?.studentGrades[0].grades[i].columnName}
                  
                {myPoint?.studentGrades[0].grades[i].isFinalized &&<Dropdown
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
                  </Dropdown>}  
                </Space>
              ),
              dataIndex:myPoint?.studentGrades[0].grades[i].columnName,
              key: myPoint?.studentGrades[0].grades[i].columnName,
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
          if (myPoint?.studentGrades) {
            for (let i = 0; i < myPoint?.studentGrades?.length; i++) {
              var dataPoint = {};
              for (
                let j = 0;
                j < myPoint?.studentGrades[i].grades.length;
                j++
              ) {
                dataPoint[myPoint?.studentGrades[i].grades[j].columnName] =
                  myPoint?.studentGrades[i].grades[j].isFinalized
                    ? myPoint?.studentGrades[i].grades[j].point
                    : "-";
              }
              dataTable.push({
                ID: myPoint?.studentGrades[i].dataStudent.IDStudent,
                Name: myPoint?.studentGrades[i].dataStudent.fullname,
                ...dataPoint,
                GPA: myPoint?.studentGrades[i].averagePoint,
              });
            }
          }

          return dataTable;
        });
      }
    }
  }, [allPoint, myPoint]);

  return (
    <div className="w-full flex justify-center min-h-screen relative">
      <div className="mt-10 mx-4 w-full">
        {checkIsTeacher() && (
          <div className="flex justify-end mb-4 gap-3">
            <Button
              className="border-[#355ED4] text-[#355ED4] text-base font-medium h-9"
              onClick={handleExportGradeBoard}
            >
              Export grade board
            </Button>
            <Button
              className="border-[#355ED4] text-[#355ED4] text-base font-medium h-9"
              onClick={() => setOpenGradeStructure(true)}
            >
              Grade Structure
            </Button>
          </div>
        )}
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
      <Modal open={openReviewResult} footer={null} closeIcon={null}>
        <div className="pr-2">
          <Form
          form={form}
            name="reviewResult"
            labelCol={{
              span: 24,
            }}
            wrapperCol={{
              span: 24,
            }}
            style={{
              maxWidth: 600,
            }}
            onFinish={handleSendReviewResult}
            autoComplete="off"
          >
            <div className="text-lg mb-5 font-medium">Review result</div>
            <Form.Item label="Title" name="title">
              <Input disabled value={dataModalReview.title} />
            </Form.Item>
            <Form.Item label="Current score" name="oldPoint">
              <Input disabled />
            </Form.Item>
            <Form.Item
              label="Desired score"
              name="expectedPoint"
              rules={[
                {
                  required: true,
                  message: "Please enter your desired score!",
                },
              ]}
            >
              <Input type="number" placeholder="Enter your desired score"  />
            </Form.Item>
            <Form.Item
              label="Reason"
              rules={[
                {
                  required: true,
                  message: "Please enter your reason!",
                },
              ]}
              name="studentExplanation"
            >
              <TextArea rows={4} placeholder="Enter your reason"  />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                span: 24,
              }}
            >
              <div className="flex justify-end gap-3">
                <Button onClick={() => setOpenReviewResult(false)}>
                  Cancel
                </Button>
                <Button
                  type="primary"
                  className="!bg-[#1677FF]"
                  htmlType="submit"
                  loading={isLoading}
                >
                  Send
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
