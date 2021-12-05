import React from "react";

 import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { AuthProvider } from "./contexts/AuthProvider";

import Main from "./components/MainComponent";
import Login from "./components/login";


function App() {
  return (
    <div style={{ fontFamily: 'Avenir' }}>
       <Router> 
         <AuthProvider> 
            <Switch> 
                <Route path="/todo" component={Main}/>
                <Route path="/" component={Login} />
           </Switch>
        </AuthProvider>
        </Router>
    </div>
  )
}

export default App
