import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../redux/auth/authSlice";

const Nav = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  return (
    <nav className="nav h-100">
      <Link to="/" className="app-name h-100">
        MY APP
      </Link>
      <ul className="flex nav-list justify-content-center h-100">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        {!user ? (
          <>
            <li>
              <button className="btn-auth">
                <Link to="/login">Login</Link>
              </button>
            </li>
            <li>
              <button className="btn-auth">
                <Link to="/register">Register</Link>
              </button>
            </li>
          </>
        ) : (
          <li>
            <button className="btn-auth">
              <Link onClick={() => dispatch(logout())}>Logout</Link>
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Nav;
