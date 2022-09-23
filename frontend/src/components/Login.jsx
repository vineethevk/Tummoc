import { useState } from 'react';
import "./Register/Register.css"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
    const navigate = useNavigate();
    const [input, setInput] = useState({});
    const [formdata, setFormdata] = useState({});

    const Inputhandler = (event) => {
        setInput((prev) => ({ ...prev, [event.target.id]: event.target.value }))
    }
    const handleSubmit = (e) => {
        console.log(input);
        e.preventDefault();
        postData();
    }

    const postData = async () => {
        await axios.post("http://127.0.0.1:9000/login", input).then(({ data }) => {
            alert(`${data.message}`)
            sessionStorage.setItem("token", data.token)
        }).catch(({ response: { data: { message } } }) => {
            console.log(message);
            alert(`${message}`)
            navigate("/");
        });
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>Email</label>
            <input type={"email"} id={"email"} onChange={Inputhandler} /><br />
            <label>Password</label>
            <input type={"password"} id={"password"} onChange={Inputhandler} />
            <input type={"submit"} value={"Login"} id="submit" />
            <button id='submit' onClick={() => navigate("/")}>Register</button>
        </form>
    )

}