import { Button, Collapse, Form, Input, Space, Spin } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useRef, useState } from "react";
import { TiLocationArrowOutline } from "react-icons/ti";
import ApiClass from "../../../../../utils/api/class";

function Review({ slug }) {
  const [allReviews, setAllReviews] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef(null);

  const getAllReviews = async () => {
    setIsLoading(true);
    let response = await ApiClass.getAllReviews(
      `grade-review/get-all-review/${slug}`
    );

    setAllReviews(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    getAllReviews();
  }, [slug]);

  return (
    <Spin spinning={isLoading}>
      <div className="w-full flex justify-center min-h-screen relative">
        <div className="w-[70%] mt-10 flex flex-col gap-6">
          <Space direction="vertical">
            {allReviews &&
              allReviews.map((element, index) => {
                return (
                  <Collapse
                    key={element._id}
                    defaultActiveKey={[element._id]}
                    collapsible="header"
                    items={[
                      {
                        key: element._id,
                        label: (
                          <div className="flex flex-col">
                            <div className="flex gap-2 font-medium text-base">
                              <div>
                                {element.gradeDetail.studentId.fullname}
                              </div>
                              <div>-</div>
                              <div>
                                {element.gradeDetail.studentId.IDStudent}
                              </div>
                            </div>
                            <div className="text-gray-500 text-[15px]">
                              Review the {element.gradeDetail.gradeId.title}{" "}
                              score column
                            </div>
                          </div>
                        ),
                        children: (
                          <div className="flex ml-6 justify-center max-h-[500px] overflow-y-auto">
                            <div className="w-full" key={element._id}>
                              <Form
                                onFinish={async (values) => {
                                  const idReview = Object.keys(values).filter(
                                    (key) => key.startsWith("id")
                                  );
                                  const newPoint = Object.keys(values).filter(
                                    (key) => key.startsWith("newPoint")
                                  );
                                  setIsLoading(true);
                                  await ApiClass.markFinalDecision(
                                    `grade-review/final-decision/${
                                      values[idReview[0]]
                                    }`,
                                    {
                                      newPoint: values[newPoint[0]],
                                    }
                                  );

                                  setIsLoading(false);
                                }}
                                name={`reviewResult_${element.id}`}
                                labelCol={{
                                  span: 24,
                                }}
                                wrapperCol={{
                                  span: 24,
                                }}
                                style={{
                                  maxWidth: 500,
                                }}
                                autoComplete="off"
                                className="w-full"
                              >
                                <Form.Item
                                  name={`id_${element._id}`}
                                  initialValue={element._id}
                                  className="hidden"
                                >
                                  <Input className="!text-gray-600" />
                                </Form.Item>
                                <Form.Item
                                  label="Title"
                                  name={`title_${element._id}`}
                                  initialValue={
                                    element.gradeDetail.gradeId.title
                                  }
                                >
                                  <Input
                                    className="!text-gray-600 !h-10"
                                    disabled
                                  />
                                </Form.Item>
                                {!element.isFinalDecision && (
                                  <Form.Item
                                    initialValue={element.oldPoint}
                                    label="Current score"
                                    style={{
                                      marginTop: "0px !important",
                                    }}
                                    name={`oldPoint_${element._id}`}
                                  >
                                    <Input
                                      className="!text-gray-600 !h-10"
                                      disabled
                                    />
                                  </Form.Item>
                                )}
                                <Form.Item
                                  label="Desired score"
                                  name={`expectedPoint_${element._id}`}
                                  initialValue={element.expectedPoint}
                                >
                                  <Input
                                    className="!text-gray-600 !h-10"
                                    disabled
                                  />
                                </Form.Item>
                                <Form.Item
                                  label="Reason"
                                  name={`studentExplanation_${element._id}`}
                                  initialValue={element.studentExplanation}
                                >
                                  <TextArea
                                    className="!text-gray-600"
                                    disabled
                                  />
                                </Form.Item>
                                <Form.Item
                                  label="The final score"
                                  name={`newPoint_${element._id}`}
                                  rules={[
                                    {
                                      required: true,
                                      message: "Please enter new point!",
                                    },
                                  ]}
                                  initialValue={
                                    element.isFinalDecision
                                      ? element.oldPoint
                                      : undefined
                                  }
                                >
                                  <Input
                                    className="!h-10 !text-gray-600"
                                    type="number"
                                    disabled={element.isFinalDecision}
                                  />
                                </Form.Item>
                                {!element.isFinalDecision && (
                                  <Form.Item
                                    wrapperCol={{
                                      span: 24,
                                    }}
                                  >
                                    <div className="flex gap-3">
                                      <Button
                                        type="primary"
                                        className="!bg-[#1677FF]"
                                        htmlType="submit"
                                      >
                                        Confirm
                                      </Button>
                                    </div>
                                  </Form.Item>
                                )}

                                <div className="font-medium mb-3">Comments</div>
                                {element.comments &&
                                  element.comments.map((element, index) => (
                                    <div className="flex items-start flex-col mb-3" key={index}>
                                      <div className="font-medium">
                                        {element.authorDetails.fullname}
                                      </div>
                                      <div>{element.content}</div>
                                    </div>
                                  ))}
                              </Form>
                              <Form
                                ref={formRef}
                                onFinish={async (values) => {
                                  console.log(values);
                                  const content = Object.keys(values).filter(
                                    (key) => key.startsWith("content")
                                  );
                                  if (values[content[0]]) {
                                    const idReview = Object.keys(values).filter(
                                      (key) => key.startsWith("id")
                                    );

                                    setIsLoading(true);
                                    let response = await ApiClass.postComment(
                                      `grade-review/comment`,
                                      {
                                        reviewId: values[idReview[0]],
                                        content: values[content[0]],
                                      }
                                    );

                                    const updatedReviews = [...allReviews];
                                    const index = updatedReviews.findIndex(
                                      (element) =>
                                        element._id === values[idReview[0]]
                                    );
                                    updatedReviews[index] = response.data;
                                    setAllReviews(updatedReviews);
                                    formRef.current.setFieldsValue({
                                      [`content_${values[idReview[0]]}`]: '',
                                    })

                                    setIsLoading(false);
                                  }
                                }}
                                name={`commentForm_${element._id}`}
                                labelCol={{
                                  span: 24,
                                }}
                                wrapperCol={{
                                  span: 24,
                                }}
                                style={{
                                  maxWidth: 520,
                                }}
                                autoComplete="off"
                                className="w-full"
                              >
                                <Form.Item
                                  name={`idComment_${element._id}`}
                                  initialValue={element._id}
                                  className="hidden"
                                >
                                  <Input className="!text-gray-600" />
                                </Form.Item>
                                <div className="flex items-center justify-between">
                                  <Form.Item
                                    name={`content_${element._id}`}
                                    className="!w-[95%]"
                                  >
                                    <TextArea defaultValue={""} rows={2} />
                                  </Form.Item>
                                  <Form.Item>
                                    <Button
                                      htmlType="submit"
                                      className="!border-none shadow-none"
                                    >
                                      <TiLocationArrowOutline size={30} />
                                    </Button>
                                  </Form.Item>
                                </div>
                              </Form>
                            </div>
                          </div>
                        ),
                      },
                    ]}
                  />
                );
              })}
          </Space>
        </div>
      </div>
    </Spin>
  );
}

export default Review;
