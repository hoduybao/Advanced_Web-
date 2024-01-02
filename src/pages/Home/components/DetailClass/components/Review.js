import { Button, Collapse, Form, Input, Space, Spin } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";
import { TiLocationArrowOutline } from "react-icons/ti";
import ApiClass from "../../../../../utils/api/class";

function Review({ slug }) {
  const [allReviews, setAllReviews] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();
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

  const onFinishComment = async (values) => {
    if(values.content)
    {
      setIsLoading(true);
      let response = await ApiClass.postComment(`grade-review/comment`, {
        reviewId: values.id,
        content: values.content,
      });
  
      const updatedReviews = [...allReviews];
      const index = updatedReviews.findIndex(
        (element) => element._id === values.id
      );
      updatedReviews[index] = response.data;
      setAllReviews(updatedReviews);
      form.setFieldValue("content", "");
  
      setIsLoading(false);
    }
    
  };

  const onFinishFinal= async (values) => {

    setIsLoading(true);
    let response = await ApiClass.markFinalDecision(`grade-review/final-decision/${values.id}`, {
      newPoint: values.newPoint,
    });

    // const updatedReviews = [...allReviews];
    // const index = updatedReviews.findIndex(
    //   (element) => element._id === values.id
    // );
    // updatedReviews[index] = response.data;
    // setAllReviews(updatedReviews);
    // form.setFieldValue("content", "");

    setIsLoading(false);
  };

  return (
    <Spin spinning={isLoading}>
      <div className="w-full flex justify-center min-h-screen relative">
        <div className="w-[70%] mt-10 flex flex-col gap-6">
          <Space direction="vertical">
            {allReviews &&
              allReviews.map((element, index) => (
                <Collapse
                  key={index}
                  collapsible="header"
                  defaultActiveKey={["1"]}
                  items={[
                    {
                      key: "1",
                      label: (
                        <div className="flex flex-col">
                          <div className="flex gap-2 font-medium text-base">
                            <div>{element.gradeDetail.studentId.fullname}</div>
                            <div>-</div>
                            <div>{element.gradeDetail.studentId.IDStudent}</div>
                          </div>
                          <div className="text-gray-500 text-[15px]">
                            Review the {element.gradeDetail.gradeId.title} score
                            column
                          </div>
                        </div>
                      ),
                      children: (
                        <div className="flex ml-6 justify-center max-h-[500px] overflow-y-auto">
                         <div className="w-full">
                         <Form
                            onFinish={onFinishFinal}
                            name="reviewResult"
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
                              name="id"
                              initialValue={element._id}
                              className="hidden"
                            >
                              <Input className="!text-gray-600" />
                            </Form.Item>
                            <Form.Item
                              label="Title"
                              name="title"
                              initialValue={element.gradeDetail.gradeId.title}
                            >
                              <Input className="!text-gray-600 !h-10" disabled />
                            </Form.Item>
                           {!element.isFinalDecision&& <Form.Item
                              initialValue={element.oldPoint}
                              label="Current score"
                              style={{
                                marginTop: "0px !important",
                              }}
                              name="oldPoint"
                            >
                              <Input className="!text-gray-600 !h-10" disabled />
                            </Form.Item>}
                            <Form.Item
                              label="Desired score"
                              name="expectedPoint"
                              initialValue={element.expectedPoint}
                            >
                              <Input className="!text-gray-600 !h-10"  disabled />
                            </Form.Item>
                            <Form.Item
                              label="Reason"
                              name="studentExplanation"
                              initialValue={element.studentExplanation}
                            >
                              <TextArea className="!text-gray-600" disabled />
                            </Form.Item>
                            <Form.Item label="The final score" name="newPoint" rules={[{
                              required:true,
                              message:"Please enter new point!"
                            }]} initialValue={element.isFinalDecision?element.oldPoint:undefined}
>
                              <Input className="!h-10 !text-gray-600" type="number" disabled={element.isFinalDecision} />
                            </Form.Item>
                            {!element.isFinalDecision&&<Form.Item
                              wrapperCol={{
                                span: 24,
                              }}
                            >
                           <div className="flex gap-3" >
                                <Button
                                  type="primary"
                                  className="!bg-[#1677FF]"
                                  htmlType="submit"
                                >
                                  Confirm
                                </Button>
                              </div>
                            </Form.Item>}  
                            
                            <div className="font-medium mb-3">Comments</div>
                            {element.comments &&
                              element.comments.map((element, index) => (
                                <div className="flex items-start flex-col mb-3">
                                  <div className="font-medium">
                                    {element.authorDetails.fullname}
                                  </div>
                                  <div>{element.content}</div>
                                </div>
                              ))}
                          </Form>
                         <Form
                            form={form}
                            onFinish={onFinishComment}
                            name="commentForm"
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
                              name="id"
                              initialValue={element._id}
                              className="hidden"
                            >
                              <Input className="!text-gray-600" />
                            </Form.Item>
                            <div className="flex items-center justify-between">
                              <Form.Item
                                name="content"
                                className="!w-[95%]"
                                initialValue={""}
                              >
                                <TextArea rows={2} />
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
              ))}
          </Space>
        </div>
      </div>
    </Spin>
  );
}

export default Review;
