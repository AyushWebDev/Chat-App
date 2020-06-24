import React from 'react';
import { BrowserRouter,Route,Switch } from 'react-router-dom';
import Signin from "./auth/signin";
import Signup from "./auth/signup";
import Chat from "./chat/main";
// import Messages from "./chat/messages";


const App= () => {
  return (
    <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Signin}/>
          <Route exact path="/signup" component={Signup}/>
          <Route exact path="/chat" component={Chat}/>
          {/* <Route exact path="/messages/:id" component={Messages}/> */}
        </Switch>
    </BrowserRouter>
  );
};

export default App;
