import React, {ChangeEvent} from 'react';

type EditableInputPropsType = {
    title: string
    setNewTitle: (title: string) => void
}

const EditableInput = (props: EditableInputPropsType) => {

    const [edit, setEdit] = React.useState(false);

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.setNewTitle(e.currentTarget.value)
    }

    const turnOnHandler = () => {
        setEdit(true)
    }

    const turnOffHandler = () => {
        setEdit(false)
    }

    return (
        edit 
        ? <input onBlur={turnOffHandler} value={props.title} autoFocus/> 
        : <span onDoubleClick={turnOnHandler}>{props.title}</span>
    )
}

export default EditableInput;