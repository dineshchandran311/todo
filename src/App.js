import React from "react";

 import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { AuthProvider } from "./contexts/AuthProvider";

import Main from "./components/MainComponent";
import Login from "./components/login";
import Header from "./components/Header";


function App() {
  return (
    <div style={{ fontFamily: 'Avenir' }}>
       <Router> 
         <AuthProvider> 
            <Header/>
            <Switch> 
                <Route exact path="/" component={Login} />
                <Route path="/todo" component={Main}/>
           </Switch>
        </AuthProvider>
        </Router>
    </div>
  )
}

export default App
