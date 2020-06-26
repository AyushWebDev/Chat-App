import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import {list} from './api';
import {isAuthenticated} from '../auth/api'
import Default from '../images/avatar.png';
import Messages from './messages';
import chatwall from '../images/chatwall.jpg';


class Chat extends Component{
    constructor(){
        super();
        this.state={
            users: [],
            toId: "",
            open: false,
            search: ""
        }
    }

    componentDidMount(){
        list(isAuthenticated().token,isAuthenticated().user._id)
        .then(data=>{
            if(data.error)
            {
                console.log(data.error);
            }
            else{
                this.setState({
                    users: data,
                    open: false
                })
            }
        })
    }

    handleClick=(id)=>event=>{
        event.preventDefault();
        this.setState({
            toId: id,
            open: true
        })
    }

    handleChange=name=>event=>{
        event.preventDefault();
        this.setState({
            [name]: event.target.value
        })
    }

   

    render(){
        const {users}=this.state;
        const userId=isAuthenticated().user._id;
        
        return(
            
            <div className="container">
            <div className="row" style={{boxShadow: "1px 3px 5px",marginTop: "80px"}}>
            <div className="col-md-4" style={{overflow: "scroll",height: "500px",widht: "50px"}}>
                {
                    <>
                    <div>
                        <form className="form-inline">
                            <input type="text" placeholder="Search" onChange={this.handleChange("search")} value={this.state.search}/>
                        </form>
                    </div>
                    {
                    users.map((user,i)=>{
                        if(user.name.toUpperCase().includes(this.state.search.toUpperCase()) && this.state.search)
                        {
                        return(
                                // <Link to={`/messages/${user._id}`}>
                               
                                <div className="media" style={{boxShadow: "1px 0px 0px"}} onClick={this.handleClick(user._id)} >
                                    <div className="media-left">
                                        <img src={Default} className="media-object" style={{width: "40px"}}/>
                                    </div>
                                    <div className="media-body" style={{paddingLeft: "20px"}}>
                                        <h6 className="media-heading" style={{fontFamily: "fantasy"}}>{user.name}</h6>
                                        <p>Lorem ipsum...</p>
                                    </div>
                                </div>
                                   
                                // </Link>
                            
                        )
                        }
                        
                    })
                }
                    </>
                }
            </div>
            <div className="col-md-8" style={{backgroundImage: `url(${chatwall})`}}>
                {this.state.open &&
                <Messages toId={this.state.toId} userId={userId}/>
                }
                {!this.state.open &&
                    <h5>Please select a chat to start messaging</h5>
                }
            </div>
            </div>
            </div>
            
        )
    }
}

export default Chat;