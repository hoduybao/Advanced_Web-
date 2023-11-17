import axios from "./axios";


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
    }
}
const ApiUser=new UserService();
export default ApiUser;
