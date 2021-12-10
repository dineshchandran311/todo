import './MainComponent.css';
import { React, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FormControl, Button, TextField} from '@mui/material';
import Todo from './Todo';
import { db } from '../firebase';
import firebase from 'firebase/compat/app';
import { useAuth } from '../contexts/AuthProvider';
import { useHistory } from 'react-router-dom';

function MainComponent() {

    const [ todos, setTodos] = useState([]);
    const [input, setInput] = useState('');
    const [description, setDescription] = useState('');
    const { currentUser } = useAuth();
    const history = useHistory();

    //when the app loads, we need to listen to the database and fetch new todos as they get added/removed

    useEffect( () => {

        //this code here.. fires when the app.js loads
        if(currentUser)
        {
            db.collection("user").doc(currentUser.uid).collection("todos").onSnapshot( snapshot => {
                setTodos( snapshot.docs.map( doc => ({ id:doc.id , todo:doc.data().todo , description:doc.data().description})) )
            })
        }
        else{
            history.push("/");
        }

    },[])

    const addTodo = (e) =>{
        e.preventDefault();



        db.collection("user").doc(currentUser.uid).collection("todos").add({
            todo: input,
            description: description,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })    
        setDescription('');    
        setInput('');
    } ;

    const validator = (value)=>{
        if(value.length <10 ){
            return{
                display: "inline",
                color: "red"
            }   
        }
        else{
            return{
                display: "none"
            }   
        }
    }


    return (
        <div className="page">
            <div>
                <form className='form'>
                    <FormControl>
                        <TextField id="outlined" label="Todo heading" maxRows={1}
                            value={input} onChange={(e)=> setInput(e.target.value)}
                            error={input.length>20}
                            helperText= {`${input.length>20 ? 'Should be less than 20 chars' : ''}`}
                        />
                    </FormControl>
                    <FormControl>
                        <TextField id="outlined-multiline-flexible" label="Description" multiline maxRows={3}
                            value={description} onChange={(e)=> setDescription(e.target.value)}
                            sx={{ width: 300}} 
                            error={description.length>100}
                            helperText= {`${description.length>100 ? 'Should be less than 100 chars' : ''}`}
                        />
                    </FormControl>
                    <div>
                        <Button variant="contained" disabled={!( input!=='' && description!=='' && description.length<=100 && input.length<=20)} primary type="submit" onClick={addTodo} >Add Todo</Button>
                    </div>
                </form>
            </div>
            <div className="content">
                {todos.map( (todo) => <Todo todo={todo}/> )}
            </div>
        </div>
    );
}

export default MainComponent;
