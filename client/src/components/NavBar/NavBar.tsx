import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import { ExitToApp, Dashboard } from '@mui/icons-material';

const NavBar = () => {
    const exit = () => {
        console.log('exit');
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Dashboard sx={{ gap: 2 }} />
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Задачи
                </Typography>
                <IconButton color="inherit" onClick={() => exit()}>
                    <ExitToApp />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
