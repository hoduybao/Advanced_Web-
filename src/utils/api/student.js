import axios from "../axios";


class StudentService {
   
    getGradeOfClass=async (path)=>{
        const response = await axios.get(path);
        return response;
    };

    
    sendReviewResult=async (path,options = {})=>{
        const response = await axios.post(path,options);
        return response;
    };

    getDetailReview=async (path)=>{
        const response = await axios.get(path);
        return response;
    };

 
}
const ApiStudent=new StudentService();
export default ApiStudent;
