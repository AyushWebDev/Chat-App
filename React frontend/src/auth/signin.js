import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Signin extends Component{
    constructor(){
        super();
        this.state={
            email: "",
            password: ""
        }
    }

    handleChange=name=>event=>{
        event.preventDefault();
        this.setState={
            [name]: event.target.value
        }
    }

   

    render(){
        return(
            <div className="container">
                <div className="row" style={{marginTop: "100px"}}>
                <div className="col-md-4"></div>
                <div className="col-md-4" style={{boxShadow: "1px 1px 10px"}}>
                    <form>
                        <div className="form-group">
                            <input type="text" className="form-control" placeholder="Email" onChange={this.handleChange("email")}></input>  
                        </div>
                        <div className="form-group">
                            <input type="password" className="form-control" placeholder="Password" onChange={this.handleChange("password")}></input>
                        </div>
                        <div>
                            <p>Didn't Registered Yet?<span className="float-right btn btn-success"><Link to="/signup">Sign Up</Link></span></p>
                        </div>
                        <button className="btn btn-raised btn-success">Sign In</button>
                    </form>
                </div>
                </div>
            </div>
        )
    }
}
export default Signin;