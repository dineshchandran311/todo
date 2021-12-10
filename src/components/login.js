import React from 'react';
import { Card, Button } from 'react-bootstrap';
import EmailIcon from '@mui/icons-material/Email';
import FacebookIcon from '@mui/icons-material/Facebook';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory } from "react-router-dom";
import { useAuth } from '../contexts/AuthProvider';

export default function Login() {
    const history = useHistory();
    const { Google } = useAuth();
    const { Facebook } = useAuth();
    const { currentUser } = useAuth();

    async function googlef(){
        try{
            await Google();
            console.log(currentUser);
        }
        catch{
            console.log("error");
        }
        console.log(currentUser);
        history.push("/todo");
    }
    
    async function facebookf(){
        try{
            await Facebook();
        }
        catch{
            console.log("error");
        }
        history.push("/todo");
    }

    return (
       <div className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh"}}>
           <Card style={{maxWidth: "400px"}}>
               <Card.Body>
                   <h2 className="text-center">Sign up</h2>
                   <div className="mt-3 text-center">
                       <Button style={{ width:300}} onClick={ googlef }>
                           <EmailIcon/> Sign up with email
                       </Button>
                       <Button  className="mt-3 text-center" style={{ width:300}} onClick={ facebookf }>
                           <FacebookIcon/> Sign up with Facebook
                       </Button>
                   </div>
               </Card.Body>
           </Card>
       </div>
   )
}


