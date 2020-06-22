import React from 'react';
import { BrowserRouter,Route,Switch } from 'react-router-dom';
import Signin from "./auth/signin";
import Signup from "./auth/signup";



const App= () => {
  return (
    <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Signin}/>
          <Route exact path="/signup" component={Signup}/>
        </Switch>
    </BrowserRouter>
  );
};

export default App;
