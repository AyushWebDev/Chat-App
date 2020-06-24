import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {signup} from './api';

class Signup extends Component{
    constructor(){
        super();
        this.state={
            name: "",
            email: "",
            password: "",
            error: "",
            signedup: false
        }
    }

    handleChange=name=>event=>{
        event.preventDefault();
        this.setState({
            [name]: event.target.value,
            error: ""
        })
    }

    clickSubmit=event=>{
        event.preventDefault();
        const {name,email,password}=this.state;
        const user={
            name,
            email,
            password
        }

        signup(user)
        .then(data=>{
            if(data.error)
            {
                this.setState({
                    error: data.error
                })
            }
            else
            {
                this.setState({
                    name: "",
                    email: "",
                    password: "",
                    signedup: true
                })
            }
        })
    }

    render(){
        return(
            <div className="container">
                <div className="row" style={{marginTop: "100px"}}>
                <div className="col-md-4"></div>
                <div className="col-md-4" style={{boxShadow: "1px 1px 10px"}}>
                        <div className="bg-success">
                            <h4 style={{color: "white",textAlign: "center"}}>Sign Up</h4>
                        </div>
                    <form  style={{padding: "50px 20px"}}>
                        {this.state.error &&
                        <div className="alert alert-danger">{this.state.error}</div>
                        }

                        {this.state.signedup &&
                        <div className="alert alert-success">Signed Up Succesfully<span className="float-right"><Link to="/">Signin</Link></span></div>
                        }

                        <div className="form-group">
                            <input type="text" className="form-control" placeholder="Name" onChange={this.handleChange("name")}></input>  
                        </div>
                        <div className="form-group">
                            <input type="text" className="form-control" placeholder="Email" onChange={this.handleChange("email")}></input>  
                        </div>
                        <div className="form-group">
                            <input type="password" className="form-control" placeholder="Password" onChange={this.handleChange("password")}></input>
                        </div>
                        <div>
                            <p>Already Registered?<span className="float-right btn btn-success"><Link to="/">Sign In</Link></span></p>
                        </div>
                        <button className="btn btn-raised btn-success" onClick={this.clickSubmit}>Sign Up</button>
                    </form>
                </div>
                </div>
            </div>
        )
    }
}
export default Signup;