import axios from "../axios";


class UserService {
    postRegister = async (path, options = {}) => {
        const response = await axios.post(path, options);
        return response;
    };
    postLogin = async (path, options = {}) => {
        const response = await axios.post(path, options);
        return response;
    };
    getCurrent=async (path)=>{
        const response = await axios.get(path);
        return response;
    };
    getUserGoogle=async (path)=>{
        const response = await axios.get(path);
        return response;
    };
    updateUser=async (path,options = {})=>{
        const response = await axios.put(path,options);
        return response;
    }
    forgetPassword=async (path,options = {})=>{
        const response = await axios.post(path,options);
        return response;
    }
    resetPassword=async (path,options = {})=>{
        const response = await axios.post(path,options);
        return response;
    }
    readAllNotify=async (path)=>{
        const response = await axios.get(path);
        return response;
    }
}
const ApiUser=new UserService();
export default ApiUser;
