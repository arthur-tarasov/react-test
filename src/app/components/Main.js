import React from "react";
import Home from "./Home";
import {About} from "./About";
import {Authorization} from "./Authorization";
import {Map} from "./Map";
import { Switch, Route } from 'react-router-dom';

export const Main = () => {
    return (
        <Switch>
            <Route exact path='/' component={Home}></Route>
            <Route exact path='/about' component={About}></Route>
            <Route exact path='/contact' component={Authorization}></Route>
            <Route exact path='/map' component={Map}></Route>
        </Switch>
    );
};