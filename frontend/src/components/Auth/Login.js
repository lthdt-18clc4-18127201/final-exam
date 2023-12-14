import React from 'react'
import img from '../../assets/signupImage.jpeg';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../../redux/auth/authSlice';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const onSubmit = (data) => {
        const { email, password } = data;
        dispatch(loginUser({email, password}))
        .then((result) => {
            if(result.payload && result.payload.message) {
                alert(result.payload.message);
            } else {
                navigate('/'); 
            }
        });
    };
    return (
        <section>
            <div className="input-form">
                <div className="col-1">
                    <h2>Login</h2>
                    <form 
                        id='form' 
                        className='flex flex-col' 
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <input 
                            type="email" {...register("email", {required: true})} 
                            placeholder='email' 
                        />
                        <input 
                            type="password" {...register("password", {required: true})} 
                            placeholder='password' 
                        />
                        {errors.email?.type === "required" && "Email is required"}
                        {errors.password?.type === "required" && "password is required"}
                        <button className='btn'>Login</button>
                    </form>
                    <span>Haven't have account yet? Go to 
                        <Link to="/register"> Register</Link>
                    </span>
                </div>
                <div className="col-2">
                    <img src={img} alt="signin-background-img" />
                </div>
            </div>
        </section>
    )
}

export default Login