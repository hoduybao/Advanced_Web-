import axios from "./axios";


class UserService {
    postRegister = async (path, options = {}) => {
        console.log(path);
        const response = await axios.post(path, options);
        return response;
    };
}
const ApiUser=new UserService();
export default ApiUser;
