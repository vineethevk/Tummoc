import "./Register.css"
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export const Register = () => {
    const [input, setInput] = useState({});
    const navigate = useNavigate();
    const Inputhandler = (event) => {
        setInput((prev) => ({ ...prev, [event.target.id]: event.target.value }))
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        postData();
    }

    const postData = async () => {
        await axios.post("http://127.0.0.1:9000/register", input).then((res) => { console.log(res) })
            .catch(({ response: { data } }) => {
                alert(`${data.message}`)
            });

    }

    return (
        <form onSubmit={handleSubmit}>
            <label>Username</label>
            <input type={"text"} id={"username"} onChange={Inputhandler} /><br />
            <label>Password</label>
            <input type={"password"} id={"password"} onChange={Inputhandler} /><br />
            <input type={"submit"} value="Register" id="submit" />
            <button id='submit' onClick={() => navigate("/login")}>Login</button>
        </form>
    )

}