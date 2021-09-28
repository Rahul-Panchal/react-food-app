import React, { useState } from "react";
import { createTodo } from "../store/actions/TodoAction";
import { useDispatch } from "react-redux";
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import { Box } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const AddTodo = (props) => {
    const classes = props.classes;
    const dispatch = useDispatch();
    const initialTutorialState = {
        id: null,
        title: "",
        body: "",
    };
    const [tutorial, setTutorial] = useState(initialTutorialState);
    const [message, setMessage] = useState();
    const [titleError, setTitleError] = useState(false);



    const handleInputChange = event => {
        const { name, value } = event.target;
        setTutorial({ ...tutorial, [name]: value });

    };

    const saveTodo = () => {
        const { title, body } = tutorial;
        if (title === "" || body === "" && body === "") {
            setTitleError(true);
        }
        else {
            setTitleError(false);
            dispatch(createTodo(title, body))
                .then(data => {
                    setTutorial({
                        title: data.title,
                        body: data.body,
                    });
                    setMessage("New Todo Added successfully!");
                    setTimeout(() => {
                        setTutorial(initialTutorialState);
                        setMessage("")
                    }, 1000)

                })
                .catch(e => {
                    console.log(e);
                });
        }

    };

    const CancelTodo = () => {
        setTutorial(initialTutorialState);
    };

    return (
        <>

            <div className={classes.heroContent}>
                <Typography variant="h6" align="center" gutterBottom>Add New Todo</Typography>
                <Container maxWidth="sm">
                    <Box mb="2rem">
                        <FormControl fullWidth variant="outlined">
                            <TextField value={tutorial.title} name="title"
                                onChange={handleInputChange} id="outlined-search" label="Enter Title" type="search" variant="outlined" />
                        </FormControl>
                        {titleError ? <span>Enter Title</span> : ""}
                    </Box>

                    <Box mb="2rem">
                        <FormControl fullWidth className={classes.margin} variant="outlined">
                            <TextField value={tutorial.body} name="body"
                                onChange={handleInputChange} id="outlined-search" label="Text" type="search" variant="outlined" />
                        </FormControl>
                        {titleError ? <span>Enter Text</span> : ""}
                    </Box>
                    <div className={classes.root}>
                        <Button variant="contained" mar color="primary" onClick={saveTodo}>Submit</Button>
                        <Button variant="contained" color="primary" onClick={CancelTodo}>Cancel</Button>
                    </div>
                    <Typography gutterBottom variant="h6" align="center" color="primary" component="h5">
                        {message}
                    </Typography>
                </Container>
            </div>

        </>
    )
}

export default AddTodo;