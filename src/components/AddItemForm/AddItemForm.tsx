import React from 'react'
import ButtonElement from '../Button/Button'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import TextField from '@mui/material/TextField'
import {useSelector, useDispatch} from 'react-redux'
import {addTodoListTC} from '../../redux/reducers/todo'

const AddItemForm = React.memo(() => {
    const [error, setError] = React.useState(false);

    const [todoListTitle, setTodoListTitle] = React.useState('')

    const dispatch = useDispatch()

    function addTodoList() {
        const trimmedTitle = todoListTitle.trim();
        if(trimmedTitle) {
            dispatch(addTodoListTC(trimmedTitle))
            setTodoListTitle('')
            setError(false)
        } else {
            setError(true)
        }
    }

    return (
        <Grid container spacing={2}>
            <Grid item md={4}>
                <Paper className="taskBox" elevation={3}>
                    <p className="taskBox__title">Add new todoList</p>

                    <div className="formBox">
                        <TextField 
                            value={todoListTitle} 
                            onChange={e => setTodoListTitle(e.currentTarget.value)}
                            size="small"
                            label="Add new todoList" 
                            error={error}
                        />

                        <ButtonElement 
                            title='ADD' 
                            variant='contained' 
                            callBack={addTodoList}
                            startIcon={<AddCircleIcon/>}
                        />
                    </div>
                </Paper>
            </Grid>
        </Grid>
    )
})

export default AddItemForm