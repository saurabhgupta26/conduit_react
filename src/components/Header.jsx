import React from "react";
import { Link, NavLink } from "react-router-dom";
import { withRouter } from 'react-router-dom';

function Header(props) {
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
    <>
    {props.userInfo && props.userInfo.username ?
    <div className="flex">
    {props.userInfo && console.log(props.userInfo.username)}
    <Link className="logo" to="/">
      <h3 to='/'>conduit</h3>
    </Link>
    <ul className="nav_bar">
      <div className="flex">
        <NavLink activeClassName="primary_btn" className="primary" to="/">
          <li>Home</li>
        </NavLink>
        <NavLink activeClassName="primary_btn" className="primary" to="/create">
          <li>New Post</li>
        </NavLink>
        
        <NavLink
          activeClassName="primary_btn"
          className="primary"
          to={`/setting/${props.userInfo.username}`}
        >
          <li>Settings</li>
        </NavLink>
        <NavLink
          activeClassName="primary_btn"
          className="primary"
          to={`/profile/${props.userInfo.username}`}
        >
          <li className='flex'><img src={props.userInfo.image} alt="image" className='author_img author_image'/>{props.userInfo.username}</li>
        </NavLink>
      </div>
    </ul>
  </div>
:<> </> }
  </>
  )
};

export default withRouter(Header);
