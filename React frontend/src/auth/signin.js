import React, {Component} from 'react';
import {Link,Redirect} from 'react-router-dom';
import {signin,authenticate} from './api';

class Signin extends Component{
    constructor(){
        super();
        this.state={
            email: "",
            password: "",
            error: "",
            redirectToChat: false
        }
    }

    handleChange=name=>event=>{
        event.preventDefault();
        this.setState({
            [name]: event.target.value
        })
    }

    clickSubmit=event=>{
        event.preventDefault();
        const {email,password}=this.state;
        const user={
            email,
            password
        }
        signin(user)
        .then(data=>{
            if(data.error)
            {
                this.setState({
                    error: data.error
                })
            }
            else
            {
                authenticate(data,()=>{
                    this.setState({
                        email: "",
                        password: "",
                        redirectToChat: true
                    })
                })
                
            }
        })
    }

    render(){
        if(this.state.redirectToChat)
            return <Redirect to="/chat"/>
        
        return(
            <div className="container">
                <div className="row" style={{marginTop: "100px"}}>
                <div className="col-md-4"></div>
                <div className="col-md-4" style={{boxShadow: "1px 1px 10px"}}>
                       <div className="bg-success">
                            <h4 style={{color: "white",textAlign: "center"}}>Sign In</h4>
                        </div>
                    <form style={{padding: "50px 20px"}}>
                        {this.state.error &&
                        <div className="alert alert-danger">{this.state.error}</div>
                        }
                        
                        <div className="form-group">
                            <input type="text" className="form-control" placeholder="Email" onChange={this.handleChange("email")}></input>  
                        </div>
                        <div className="form-group">
                            <input type="password" className="form-control" placeholder="Password" onChange={this.handleChange("password")}></input>
                        </div>
                        <div>
                            <p>Didn't Registered Yet?<span className="float-right btn btn-success"><Link to="/signup">Sign Up</Link></span></p>
                        </div>
                        <button className="btn btn-raised btn-success" onClick={this.clickSubmit}>Sign In</button>
                    </form>
                </div>
                </div>
            </div>
        )
    }
}
export default Signin;