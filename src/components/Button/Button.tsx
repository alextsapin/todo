import React from 'react';

type ButtonPropsType = {
    title: string
    callBack: () => void
    filterClass?: string
    btnClass?: string
}

const Button = (props: ButtonPropsType) => {
    const onClickHandler = () => {
        props.callBack()
    }
    
    return (
        <button className={`${props.btnClass} + ${props.filterClass}`} onClick={onClickHandler}>{props.title}</button>
    )
}

export default Button;