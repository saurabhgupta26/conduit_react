import React from "react";
import { Link, NavLink } from "react-router-dom";

class Header extends React.Component{
render() {
  return (
    <div className="flex">
      <Link className="logo" to="/">
        <h3>conduit</h3>
      </Link>
      <ul className="nav_bar">
        {this.props.isLoggedIn ? <AuthHeader /> : <NonAuthHeader />}
      </ul>
    </div>
  );
}
}

const NonAuthHeader = () => (
  <div className="flex">
    <NavLink activeClassName="primary_btn" className="primary" to="/login">
      <li>Sign In</li>
    </NavLink>
    <NavLink activeClassName="primary_btn" className="primary" to="/signup">
      <li>Sign Up</li>
    </NavLink>
  </div>
);

const AuthHeader = () => (
  <div className="flex">
    <NavLink activeClassName="primary_btn" className="primary" to="/">
      <li>Home</li>
    </NavLink>
    <NavLink activeClassName="primary_btn" className="primary" to="/new">
      <li>New Post</li>
    </NavLink>
    <NavLink activeClassName="primary_btn" className="primary" to="/settings">
      <li>Settings</li>
    </NavLink>
    <NavLink activeClassName="primary_btn" className="primary" to="/login">
      <li>User</li>
    </NavLink>
  </div>
);

export default Header;
