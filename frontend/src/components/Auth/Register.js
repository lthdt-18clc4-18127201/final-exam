import React from 'react';
import img from '../../assets/signupImage.jpeg';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../../redux/auth/authSlice';
import { useDispatch } from 'react-redux';

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const onSubmit = (data) => {
        const { name, email, password } = data;
        dispatch(registerUser({name, email, password}))
        .then((result) => {
            if(result.payload.message !== "Register successfully!") {
                alert('User was exist');
            } else {
                alert('Register successfully');
                navigate('/login');
            }
        })
    };
    return (
        <section>
            <div className="input-form">
                <div className="col-1">
                    <h2>Register</h2>
                    <span>register and enjoy the service</span>

                    <form 
                        id='form' 
                        className='flex flex-col' 
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <input 
                            type="text" {...register("name", {required: true})} 
                            placeholder='name' 
                        />
                        <input 
                            type="email" {...register("email", {required: true})} 
                            placeholder='email' 
                        />
                        <input 
                            type="password" {...register("password", {required: true})} 
                            placeholder='password' />
                        <input 
                            type="text" {...register("confirmpwd")} 
                            placeholder='confirm password' />
                        {errors.email?.type === "required" && "Email is required"}
                        {errors.password?.type === "required" && "password is required"}
                        <button className='btn'>Register</button>
                    </form>
                    <span>Already have account? Go to 
                        <Link to="/login"> Login</Link>
                    </span>
                </div>
                <div className="col-2">
                    <img src={img} alt="signin-background-img" />
                </div>
            </div>
        </section>
    )
}

export default Register