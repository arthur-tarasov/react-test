import React from "react";
import { NavLink } from 'react-router-dom';
import {Authorization} from "./Authorization";
export const Header = () => {
    return(
        <nav className="navbar navbar-default">
            <div className="container">
                <div className="navbar-header">
                    <ul className="nav navbar-nav">
                        <li><NavLink exact activeClassName="active" to='/'>Home</NavLink></li>
                        <li><NavLink exact activeClassName="active" to='/about'>About</NavLink></li>
                        <li><NavLink exact activeClassName="active" to='/contact'>Authorization</NavLink></li>
                        <li><NavLink exact activeClassName="active" to='/map'>Map</NavLink></li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};
