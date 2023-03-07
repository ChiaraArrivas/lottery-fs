import { useState } from "react";
import { authUser } from "../utility/auth";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import { retrieveActiveDraw } from "../utility/game";
import { setDrawData } from "../store/drawSlice";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: "",
    })

    const handleChange = (event) => {
        const { value, name } = event.target;
        setForm({
            ...form,
            [name]: value,
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const is_auth = await authUser(form.email, form.password);
        if (is_auth) {
            dispatch(login({
                token: is_auth.token,
                user: is_auth.user,
            }))

            const activeDraw = await retrieveActiveDraw();
            dispatch(setDrawData(activeDraw));

            navigate("/home");
        } else {
            alert("Email o password errati");
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input className="border border-gray-500" type="email" name="email" value={form.email} onChange={handleChange} required />
            <input className="border border-gray-500 mx-2" type="password" name="password" value={form.password} onChange={handleChange} required />
            <button type="submit">Accedi</button>
        </form>
    )
}

export default Login;