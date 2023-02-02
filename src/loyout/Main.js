import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Main = () => {
    return (
        <div>
            <nav>
                <Link style={{ margin: '20px', padding: "20px" }} to="/register">Register</Link>
                <Link to="/login">Login</Link>
            </nav>
            <Outlet></Outlet>

        </div>
    );
};

export default Main;