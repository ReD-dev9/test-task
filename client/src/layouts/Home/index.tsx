import { Container } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { NavBar } from '../../components';

const Home = () => {
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
