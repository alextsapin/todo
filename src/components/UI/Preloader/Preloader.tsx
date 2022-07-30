import React from 'react';
import Container from '@mui/material/Container';
import spinner from './spinner.gif';
import css from './css.module.scss';

const Preloader = () => {
    return (
        <Container fixed>
            <img className={css.item} src={spinner} alt="spinner"/>
        </Container>
    )
}

export default Preloader;