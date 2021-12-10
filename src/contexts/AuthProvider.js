import React, { useContext, useState, useEffect} from 'react';
import { useHistory } from "react-router-dom";
import { auth } from '../firebase';
import firebase from 'firebase/compat/app';

const AuthContext = React.createContext();

export function useAuth(){
    return useContext(AuthContext)
}

export function AuthProvider({children}) {

    const [ currentUser, setCurrentUser ] = useState(null);
    const [ loading , setLoading ] = useState(true);
    const history = useHistory();

    function Google(){
        return auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
    }

    function Facebook(){
        return auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
    }

    function currentUserSetter(user){
        setCurrentUser(user);
    }

    useEffect(() =>{
         auth.onAuthStateChanged( user =>{
            //console.log(currentUser + "before");
            setCurrentUser(user);
            setLoading(false);
            console.log(currentUser);
            if(currentUser)
            {
                history.push("/todo");
            }
        })
    },[currentUser,history])
 
    const value = { currentUser, Facebook, Google, currentUserSetter};

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

