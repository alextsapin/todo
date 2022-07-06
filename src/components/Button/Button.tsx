import React from 'react'
import Button from '@mui/material/Button'

type ButtonPropsType = {
    title: string
    variant: any
    color?: any
    callBack: () => void
    filterClass?: string
    btnClass?: string
    disabled?: boolean
    startIcon?: any
}

const ButtonElement = React.memo((props: ButtonPropsType) => {
    const onClickHandler = () => {
        props.callBack()
    }
    
    return (
        <Button 
            variant={props.variant} 
            color={props.color}
            className={props.btnClass + ' ' + props.filterClass} 
            onClick={onClickHandler}
            disabled={props.disabled}
            value={props.title}
            startIcon={props.startIcon}
        >
        {props.title}
        </Button>
    )
})

export default ButtonElement