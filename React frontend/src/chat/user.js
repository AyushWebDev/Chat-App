import React,{Component} from 'react';
import {list} from './api';
import {isAuthenticated} from '../auth/api';
import Default from '../images/avatar.png';
import Messages from './messages';

class User extends Component{
    constructor(){
        super();
        this.state={
            users: [],
            toId: "",
            open: false
        }
    }

    componentDidMount(){
        list()
        .then(data=>{
            if(data.error)
            {
                console.log(data.error);
            }
            else{
                this.setState({
                    users: data
                })
            }
        })
    }

    handleClick=id=>event=>{
        event.preventDefault();
        this.setState({
            toId: id,
            open: true
        })
    }

    render(){
        const {users}=this.state;
        const userId=isAuthenticated().user._id;
        
        return(
            
            <div className="container">
                <div className="row" style={{boxShadow: "1px 3px 5px",marginTop: "80px"}}>
            <div className="col-md-4">
                {
                    users.map((user,i)=>{
                        return(
                            
                                <div className="media" style={{boxShadow: "1px 0px 0px"}} onClick={this.handleClick(user._id)}>
                                    <div className="media-left">
                                        <img src={Default} className="media-object" style={{width: "40px"}}/>
                                    </div>
                                    <div className="media-body" style={{paddingLeft: "20px"}}>
                                        <h6 className="media-heading" style={{fontFamily: "fantasy"}}>{user.name}</h6>
                                        <p>Lorem ipsum...</p>
                                    </div>
                                </div>
                            
                        )
                    })
                }
            </div>
            <div className="col-md-8">
                {this.state.open &&
                <Messages to={this.state.toId} userId={userId}/>
                }
            </div>
            </div>
            </div>
            
        )
    }
}

export default User;