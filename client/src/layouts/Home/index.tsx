import { FC } from 'react';
import { Container } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { NavBar } from '../../components';

const Home: FC = () => {
    return (
        <>
            <Container maxWidth="md">
                <NavBar />
                <Outlet />
            </Container>
        </>
    );
};

export default Home;
