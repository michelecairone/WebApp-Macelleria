import { loginFailure, loginStart, loginSuccess } from "./userRedux";
import axios from "axios";
import { useRouter } from "next/router";


export const loginR = async (dispatch, inputs) => {
    
    
    try {
        const res = await axios.post('http://localhost:80/api/user/login', inputs);
        if (res.data == false) {
            dispatch(loginFailure());
            return false;  
        }
        else if (res.data.admin == true) {
            dispatch(loginSuccess(res.data)); 
            
        }
        else {
            dispatch(loginSuccess(res.data));
             
        }
        return true;
        
    } catch (err) {
        dispatch(loginFailure());
        return false;
    }
};
