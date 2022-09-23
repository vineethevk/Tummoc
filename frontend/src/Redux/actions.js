import * as types from "./actionTypes";
import Axios from "axios";

const postLogin = (data) => {
    const { email, password } = data;

    return(dispatch)=>{
        
    }
}
const fetchToken = (data) => {
    const { email, password } = data;
    console.log(email);
    console.log(password);

    return (dispatch) => {
        dispatch(fetchAuthRequest());
        Axios.post("https://login-signup-using-redux.herokuapp.com/api/login", {
            email: email,
            password: password,
        })
            .then((r) => {
                dispatch(fetchAuthSuccess(r.data.accessToken));
                // console.log(r.data);
            })
            .catch((e) => dispatch(fetchAuthFailure(e.data)));
    };
};

export { fetchToken };