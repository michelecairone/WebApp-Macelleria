import { loginFailure, loginStart, loginSuccess } from "./userRedux";
import axios from "axios";
import passwordHash from 'password-hash';


export const loginR = async (dispatch, email, password) => {
    
    
    try {
        const res = await axios.post('http://localhost:80/api/user/login', email);

        if (passwordHash.verify(password, res.data.password)) {
            dispatch(loginSuccess(res.data));
            return true;  
            
        }
        else {
            dispatch(loginFailure());
            return false;  

        }
          
    } catch (err) {
        dispatch(loginFailure());
        return false;
    }
};
