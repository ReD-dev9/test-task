import React from "react";
import { TextField, FormControl, FormHelperText, Button, Grid} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { addTask } from '../../actions/tasksActions';
import * as Yup from "yup";
import { useFormik } from "formik";

const useStyles = makeStyles((theme) => ({
    error: {
        position:'absolute',
        marginLeft: '12px'
    },
}));

const TaskCreate = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const schema = Yup.object().shape({
        title: Yup.string()
            .required('Введите заголовок'),
        desc: Yup.string()
            .required('Введите описание')
    });
    const formik = useFormik({
        initialValues: {
            title: '',
            desc: ''
        },
        validationSchema: schema,
        onSubmit: (values, {resetForm}) => {
            dispatch(addTask(values)).then(() => resetForm());
        }
    });
    const { values, errors, handleSubmit, handleChange, touched } = formik;
    return (
        <form onSubmit = { handleSubmit } autoComplete = "off">
            <Grid container>
                <Grid item xs={5}>
                    <FormControl fullWidth>
                        <TextField
                            name="title"
                            id = "filled-basic"
                            label = "Текст задачи"
                            aria-describedby="error-title"
                            variant = "filled"
                            value={values.title}
                            onChange={handleChange}
                        />
                    </FormControl>
                    {errors.title && touched.title && <FormHelperText error id="error-title" className={classes.error}>{errors.title}</FormHelperText>}
                </Grid>
                <Grid item xs={5}>
                    <FormControl fullWidth>
                        <TextField
                            name="desc"
                            onChange={handleChange}
                            aria-describedby="error-desc"
                            id="filled-basic"
                            value={values.desc}
                            label="Описание задачи"
                            variant="filled"
                        />
                    </FormControl>
                    {errors.desc && touched.desc && <FormHelperText error id="error-desc" className={classes.error}>{errors.desc}</FormHelperText>}
                </Grid>
                <Grid item xs={2}>
                    <Button
                        type="submit"
                        fullWidth
                        style={{height:'100%', borderRadius: 0}}
                        variant="contained"
                        color="primary"
                    >
                        Добавить
                    </Button>
                </Grid>
            </Grid>
        </form>
    )
}

export default TaskCreate;