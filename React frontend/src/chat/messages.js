import React,{Component} from 'react';
import {postMessage,getMessages} from './api';
import {isAuthenticated} from '../auth/api';
import chatwall from '../images/chatwall.jpg'


class Messages extends Component{
    constructor(props){
        super(props);
        this.state={
            messages: [],
            text: "",
            fromId: "",
            toId: "",
            error: ""
        };
        
    }

    handleChange=name=>event=>{
        event.preventDefault();
        this.setState({
            [name]: event.target.value
        })
    }
    get=()=>{
        const {fromId,toId}=this.state;
        getMessages(fromId,toId,isAuthenticated().token)
        .then(data=>{
            if(data.error)
                console.log(data.error);
            else{
                this.setState({
                    messages: data,
                    text: ""
                })
            
            }
        })
    }
    componentWillReceiveProps()
    {
        const from=this.props.userId;
        const to=this.props.toId;
        console.log(this.props);
        this.setState({
            fromId: from,
            toId: to
        })
        getMessages(from,to,isAuthenticated().token)
        .then(data=>{
            if(data.error)
                console.log(data.error);
            else{
                this.setState({
                    messages: data,
                    text: ""
                })
            
            }
        })
    }
    
    // componentDidMount(){
    //     const from=this.props.userId;
    //     const to=this.props.toId;
    //     console.log(this.props);
    //     this.setState({
    //         fromId: from,
    //         toId: to
    //     })
    //     getMessages(from,to,isAuthenticated().token)
    //     .then(data=>{
    //         if(data.error)
    //             console.log(data.error);
    //         else{
    //             this.setState({
    //                 messages: data,
    //                 text: ""
    //             })
            
    //         }
    //     })
    // }

    

    clickSubmit=event=>{
        event.preventDefault();
        const {fromId,toId,text}=this.state;
        postMessage(fromId,toId,text,isAuthenticated().token)
        .then(data=>{
            if(data.error)
                console.log(data.error);
            else{
                this.get();
            }
        })
    }

    render(){
        const {fromId,toId,text}=this.state;
        return(
            <div>
            <div style={{overflow: "auto",height: "500px",widht: "100px"}}>
                    {this.state.error &&
                        <p className="alert alert-danger">{this.state.error}</p>
                    }
                    {
                    this.state.messages.map((msg,i)=>{
                        if(msg.postedBy._id===fromId)
                        return(
                        
                        <div style={{textAlign: "right",marginTop: "40px"}}><span class="bg-primary" style={{borderRadius: "10px",padding: "15px",margin: "20px"}}>{msg.text}</span></div>
                        )
                        return(
                            <div style={{textAlign: "left",marginTop: "40px"}}><span class="bg-warning" style={{borderRadius: "10px",padding: "15px",margin: "20px"}}>{msg.text}</span></div>
                        )
                        
                    })
                    }
                    
                
            
            </div>
            
            <form className="form-inline">
                <div className="form-group" style={{marginRight: "80px"}}>
                    <input type="text" className="form-control" placeholder="Type Your Message Here........." onChange={this.handleChange("text")} value={this.state.text} style={{borderRadius: "20px"}}/>
                </div> 
                <button className="btn btn-raised btn-success" onClick={this.clickSubmit}>Send</button>
            </form>
            </div>
        )
    }
}

export default Messages;