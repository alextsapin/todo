import React, {ChangeEvent} from 'react';

type EditableInputPropsType = {
    title: string
    callBack: (newTitle: string) => void
}

const EditableInput = (props: EditableInputPropsType) => {

    const [edit, setEdit] = React.useState(false);

    const [newTitle, setNewTitle] = React.useState(props.title);

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    const turnOnHandler = () => {
        setEdit(true)
    }

    const turnOffHandler = () => {
        setEdit(false)
        props.callBack(newTitle)
    }

    return (
        edit 
        ? <input value={newTitle} onBlur={turnOffHandler} onChange={onChangeHandler} autoFocus/> 
        : <span onDoubleClick={turnOnHandler}>{props.title}</span>
    )
}

export default EditableInput;