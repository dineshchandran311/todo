import './App.css';
import { React, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FormControl, Button, TextField} from '@mui/material';
import Todo from './components/Todo';
import firebase from './firebase';

function App() {

    const [ todos, setTodos] = useState([]);
    const [input, setInput] = useState('');
    const [description, setDescription] = useState('');


    //when the app loads, we need to listen to the database and fetch new todos as they get added/removed

    useEffect( () => {

        //this code here.. fires when the app.js loads

        firebase.firestore().collection('todos').orderBy('timestamp','desc').onSnapshot( snapshot => {
            setTodos( snapshot.docs.map( doc => ({ id:doc.id , todo:doc.data().todo , description:doc.data().description})) )
        })

    },[])

    const addTodo = (e) =>{
        e.preventDefault();



        firebase.firestore().collection('todos').add({
            todo: input,
            description: description,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })    
        setDescription('');    
        setInput('');
    } ;



    return (
        <div className="page">
            <div className="heading">
                <h1 className="head-text"><strong>Todo List</strong></h1>
            </div>
            <div>
                <form className='form'>
                    <FormControl>
                        <TextField id="outlined" label="Todo heading" maxRows={1}
                            value={input} onChange={(e)=> setInput(e.target.value)}
                        />
                    </FormControl>
                    <FormControl>
                        <TextField id="outlined-multiline-flexible" label="Description" multiline maxRows={3}
                            value={description} onChange={(e)=> setDescription(e.target.value)}
                            sx={{ width: 300}}
                        />
                    </FormControl>
                    <div>
                        <Button variant="contained" disabled={!( input!='' && description!='' )} primary type="submit" onClick={addTodo} >Add Todo</Button>
                    </div>
                </form>
            </div>
            <div className="content">
                {todos.map( (todo) => <Todo todo={todo}/> )}
            </div>
        </div>
    );
}

export default App;
