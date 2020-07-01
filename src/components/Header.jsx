import React from "react";
import { Link, NavLink } from "react-router-dom";
import { withRouter } from 'react-router-dom';

function Header(props) {
  console.log(props.userInfo, "USERINFO", props);
  return props.isLoggedIn ? AuthHeader(props) : NonAuthHeader(props);
}

function NonAuthHeader(props) {
  return (
  <div className="flex">
    <Link className="logo" to="/">
      <h3>conduit</h3>
    </Link>
    <ul className="nav_bar">
      <div className="flex">
        <NavLink activeClassName="primary_btn" className="primary" to="/login">
          <li>Sign In</li>
        </NavLink>
        <NavLink activeClassName="primary_btn" className="primary" to="/signup">
          <li>Sign Up</li>
        </NavLink>
      </div>
    </ul>
  </div>
  )
}

function AuthHeader(props) {
  return(
  <div className="flex">
    <Link className="logo" to="/">
      <h3 to='/'>conduit</h3>
    </Link>
    <ul className="nav_bar">
      <div className="flex">
        {/* {console.log(this.props.userInfo, "USERINFO")} */}
        <NavLink activeClassName="primary_btn" className="primary" to="/">
          <li>Home</li>
        </NavLink>
        <NavLink activeClassName="primary_btn" className="primary" to="/create">
          <li>New Post</li>
        </NavLink>
        <NavLink
          activeClassName="primary_btn"
          className="primary"
          // to={`/setting/${props.userInfo.username}`}
          to={`/setting`}
        >
          <li>Settings</li>
        </NavLink>
        <NavLink
          activeClassName="primary_btn"
          className="primary"
          // to={`/profile/${props.userInfo.username}`}
          to={`/profile/`}
        >
          <li>User</li>
        </NavLink>
      </div>
    </ul>
  </div>
  )
};

export default withRouter(Header);
