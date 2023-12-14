import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../redux/auth/authSlice';

const Nav = () => {
    const user = useSelector((state) => state.user.user);
    const dispatch = useDispatch();

    return (
        <nav className='nav'>
            <Link to="/" className='app-name'>
                MY APP
            </Link>
            <ul className='flex nav-list'>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
                {
                    !user 
                    ? (
                        <>
                            <li>
                                <button className='btn-auth'>
                                    <Link to="/login">Login</Link>
                                </button>
                            </li>
                            <li>
                                <button className='btn-auth'>
                                    <Link to="/register">Register</Link>
                                </button>
                            </li>
                        </>
                    )
                    : (
                        <li>
                            <button className='btn-auth'>
                                <Link onClick={() => dispatch(logout())}>Logout</Link>
                            </button>
                        </li>
                    )
                }
            </ul>
            
        </nav>
    )
}

export default Nav