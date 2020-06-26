import React from "react";
import { Link, NavLink } from "react-router-dom";

function Header(props) {
  return (
    <div className="flex">
      <Link className="logo" to="/">
        <h3>conduit</h3>
      </Link>
      <ul className="nav_bar flex">
        <NavLink activeClassName="primary_btn" className="primary" to="/login">
          <li>Sign In</li>
        </NavLink>
        <NavLink activeClassName="primary_btn" className="primary" to="/signup">
          <li>Sign Up</li>
        </NavLink>
      </ul>
    </div>
  );
}

export default Header;
