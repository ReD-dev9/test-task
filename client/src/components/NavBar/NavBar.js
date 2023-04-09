import React, {Fragment} from 'react';
import { AppBar, Toolbar, Typography, IconButton} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { ExitToApp,  Dashboard } from '@material-ui/icons'
import { logout } from '../../actions/authAction';
import { history } from "../../index";

const useStyles = makeStyles((theme) => ({
    title: {
      flexGrow: 1,
    },
    icon: {
        marginRight: theme.spacing(2),
    },
}));

const NavBar = () =>  {
    const classes = useStyles();
    const dispatch = useDispatch();

    const exit = () => {
        dispatch(logout()).then(() => history.push('/login'));
    }

    return (
        <Fragment>
            <AppBar position="static">
                <Toolbar>
                    <Dashboard className={classes.icon} />
                    <Typography variant="h6" className={classes.title}>
                        Задачи
                    </Typography>
                    <IconButton color="inherit" onClick={() => exit()}>
                        <ExitToApp />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </Fragment>
    )
}

export default NavBar;
