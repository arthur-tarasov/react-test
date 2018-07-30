import React from "react";
import PropTypes from 'prop-types'; // ES6

export class Authorization extends React.Component {
    render() {
        return (
           <div>
               <form>
                   <div className="form-group">
                       <label htmlFor="exampleInputEmail1">Email address</label>
                       <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Email"/>
                   </div>
                   <div className="form-group">
                       <label htmlFor="exampleInputPassword1">Password</label>
                       <input type="password" className="form-control" id="exampleInputPassword1"
                              placeholder="Password"/>
                   </div>
                   <div className="checkbox">
                       <label>
                           <input type="checkbox" /> Check me out
                       </label>
                   </div>
                   <button type="submit" className="btn btn-default">Submit</button>
               </form>
           </div>
        );
    }
}