import React from "react";
import { Link,NavLink } from "react-router-dom";
const Nav=() =>{
     return(
          <div className="navbar">
               <div className="container">
               <a href="fff" className="logo">logo</a>
               <ul>
                    {/* <a href="/">Home</a>
                    <a href="/about">About</a> */}
                    
                    <NavLink activeClassName="selected" exact to="/">Home</NavLink>
                    <NavLink activeClassName="selected" exact to="/about">About</NavLink>
               </ul>
               </div>
          </div>
          )
}
export default Nav;
