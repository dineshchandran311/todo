import { Modal } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import { React, useState} from 'react';
import { db } from '../firebase';
import 'bootstrap/dist/css/bootstrap.min.css';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import {TextField} from '@mui/material';
import { useAuth } from '../contexts/AuthProvider';
import styled from 'styled-components';



function Todo(props) {
    

    const [input, setInput ] = useState('');
    const [description, setDescription] = useState('');
    const [open, setOpen] = useState(false);
    const { currentUser } = useAuth();
    
    const editTodo = (e) => {
        e.preventDefault();
        if(input && description)
        {
            db.collection("user").doc(currentUser.uid).collection("todos").doc(props.todo.id).set({
            todo: input,
            description: description
            },{merge : true});
        }
        setOpen(false);
    }

    const editSet = () =>{
        setInput(props.todo.todo);
        setDescription(props.todo.description);
        setOpen(true);
    }

    const deleteVal =  () => db.collection("user").doc(currentUser.uid).collection("todos").doc(props.todo.id).delete()

    return (
        <div key={props.todo.id}>
            <Modal open={open} onClose={ e => setOpen(false)} sx={{ background:"transparent", display: "flex", alignItems: "center", justifyContent: "center"}}>
                <Container> 
                    <TextField id="outlined" label="Todo heading" maxRows={1} 
                            value={input} onChange={(e)=> setInput(e.target.value)}
                    />
                    <TextField id="outlined" label="Todo Description" maxRows={3}
                        value={description} onChange={(e)=> setDescription(e.target.value)}
                    />
                    <Btns>
                        <Button type="cancel" onClick={ () => setOpen(false)} variant="contained">Close</Button>
                        <Button type="submit" onClick={editTodo} variant="contained">Change</Button>
                    </Btns>
                </Container>
            </Modal>
            <Box>
                <Card variant="outlined" sx={{ width: 300, height: 300, color:'grey' }}>
                    <CardContent>
                        <Typography variant="h5" sx={{  textAlign: "center", fontSize: 25 }}>{props.todo.todo}</Typography>

                        <Typography variant="caption" sx={{ mt: 3, fontSize: 18, overflowWrap: "break-word" }}  color="text.secondary">{props.todo.description}</Typography>

                    </CardContent> 
                    <CardActions>
                        <Button variant="outlined" startIcon={<DeleteIcon/>}  onClick={ deleteVal } sx={{  ml:3, width:100, height:40 }}>Delete</Button>
                        <Button variant="contained" startIcon={<ModeEditOutlineIcon/>} onClick={ editSet } sx={{  ml:3,width:100, height:40 }}>Edit</Button>
                    </CardActions>
                </Card>
            </Box>
        </div>
    ) 
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 40px;
    height: 300px;
    width: 300px;
    margin-top: 30px;
    flex-wrap: wrap;
    background: white;
    border-radius: 20px;
`;

const Btns = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 50px;
`;


export default Todo;
