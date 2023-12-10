import { Button } from "antd";
import logo from "../../../../assets/logo.svg";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import ApiClass from "../../../../utils/api/class";
import { useEffect } from "react";

function JoinClassByLink() {
  const params = useParams();
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");

  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      let response = await ApiClass.joinClassByLink(
        `class/check/${params.name}`
      );

      if (response.success) {
        navigate(`/class/${params.name}`);
      }
    };
    fetch();
  },[]);
  // const slug = params.name;
  const handleJoinClass = () => {
    const fetch = async () => {
      let response = await ApiClass.joinClassByLink(
        `class/join-class/${params.name}?code=${code}`
      );

      console.log(response);
      if (response.success) {
        navigate(`/class/${response.data.slug}`);
      }
    };
    fetch();
  };

  return (
    <div className="w-full flex justify-center pl-64">
      <div className="w-3/5 mt-14 flex flex-col gap-6 rounded-lg border">
        <div className="flex flex-col items-center justify-center gap-4 py-10 bg-gray-100 rounded-t-lg">
          <img src={logo} alt="logo" className="cursor-pointer w-[100px]" />
          <div className="text-xl font-normal">
            <span className="font-medium">BTH</span> Classroom
          </div>
          <div className="w-3/5 text-center text-gray-600 text-sm">
            The class helps with communication skills, saving time, and always
            maintaining organization.
          </div>
        </div>
        <div className="flex flex-col justify-center items-center mt-4 gap-4">
          <div className="text-gray-600 text-sm">
            You are participating in the class as a student.
          </div>
          <Button
            type="primary"
            className="!bg-[#1677FF] font-medium px-6 text-base h-9"
            onClick={handleJoinClass}
          >
            Join the class
          </Button>
          <div className="text-gray-600 text-sm my-10">
            By participating, you agree to share contact information with others
            in your class.
          </div>
        </div>
      </div>
    </div>
  );
}

export default JoinClassByLink;
