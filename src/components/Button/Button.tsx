import React from 'react';
import Button from '@mui/material/Button';

type ButtonPropsType = {
    title: string
    variant: any
    callBack: () => void
    filterClass?: string
    btnClass?: string
    disabled?: boolean
    startIcon?: any
}

const ButtonElement = (props: ButtonPropsType) => {
    const onClickHandler = () => {
        props.callBack()
    }
    
    return (
        <Button 
            variant={props.variant} 
            className={props.btnClass + ' ' + props.filterClass} 
            onClick={onClickHandler}
            disabled={props.disabled}
            value={props.title}
        >
        {props.title}
        </Button>
    )
}

export default ButtonElement;