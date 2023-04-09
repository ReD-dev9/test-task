import React from 'react';
import { Button, TextField, Container, Typography, FormHelperText, FormControl} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { useFormik } from "formik";
import * as Yup from "yup";
import { auth } from '../../actions/authAction';
import { history } from "../../index";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    }
}));

const Auth = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const schema = Yup.object().shape({
        email: Yup.string()
            .required('Введите почту')
            .email('Некорректная почта')
            .min(6, 'Минимальная длина 6 символов'),
        password: Yup.string()
            .min(6, 'Минимальная длина 6 символов')
            .required('Введите пароль')
    });
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: schema,
        onSubmit: (values,actions) => {
                let socket = new WebSocket('ws://localhost:5000/api/auth');
                socket.onopen = (e) => {
                    socket.send(JSON.stringify(values));
                }
                socket.onmessage = function(event) {
                    const data = JSON.parse(event.data);
                    if (!data.statusAuth) {
                        actions.setFieldError("general", "Неверный логин или пароль")
                    }

                    if (data.statusAuth) {
                        dispatch(auth(event.data.message)).then(() => {history.push('/')});
                    }
                };
                socket.onclose = function(event) {
                    if (event.wasClean) {
                        console.log(`[close] Соединение закрыто чисто, код=${event.code} причина=${event.reason}`);
                    } else {
                        console.log('[close] Соединение прервано');
                    }
                };
        }
    });
    const { values, errors, handleSubmit, handleChange, touched } = formik;
    return (
        <Container component="main" className={classes.paper} maxWidth="xs">
            <Typography component="h1" variant="h5">
                Авторизация
            </Typography>
            <form onSubmit = { handleSubmit }>
                <FormControl error fullWidth>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        id="email"
                        label="Ваш Email"
                        name="email"
                        aria-describedby="error-email"
                        value={values.email}
                        onChange={handleChange}
                        autoFocus
                    />
                    {errors.email && touched.email && <FormHelperText id="error-email">{errors.email}</FormHelperText>}
                </FormControl>
                <FormControl error fullWidth>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        name="password"
                        label="Ваш пароль"
                        type="password"
                        id="password"
                        aria-describedby="error-password"
                        value={values.password}
                        onChange={handleChange}
                        autoComplete="current-password"
                    />
                    {errors.password && touched.password && <FormHelperText id="error-password">{errors.password}</FormHelperText>}
                </FormControl>
                <FormHelperText error>{errors.general}</FormHelperText>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    Войти
                </Button>
            </form>
        </Container>
    );
}


export default Auth;
