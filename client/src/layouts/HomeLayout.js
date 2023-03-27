import React, {Fragment} from 'react';
import { Container, CssBaseline } from '@material-ui/core';
import {NavBar} from '../components';

const HomeLayout = ({ children }) =>  {
    return (
        <Fragment>
            <CssBaseline />
            <Container maxWidth="md">
                <NavBar />
                {children}
            </Container>
        </Fragment>
    )
}

export default HomeLayout;
