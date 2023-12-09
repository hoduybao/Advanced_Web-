import axios from "../axios";


class ClassService {
  
    getListClass =async (path)=>{
        const response = await axios.get(path);
        return response;
    };
    getDetailClass =async (path)=>{
        console.log(path)
        const response = await axios.get(path);
        return response;
    };
    newClass = async (path, options = {}) => {
        const response = await axios.post(path, options);
        return response;
    };
    joinClass= async (path) => {
        const response = await axios.post(path);
        return response;
    };
    invitePeople= async (path,options = {}) => {
        const response = await axios.post(path,options);
        return response;
    };
}
const ApiClass=new ClassService();
export default ApiClass;
