import { TextField, FormControl, FormHelperText, Button, Grid } from '@mui/material';
import * as Yup from 'yup';
import { useMutation, ApolloCache } from '@apollo/client';
import { useFormik } from 'formik';
import { createTasks, tasksList } from './const';

const TaskCreate = () => {
    const [addTask] = useMutation(createTasks, {
        update(cache: ApolloCache<any>, { data: { createTask } }) {
            const { tasks } = cache.readQuery({ query: tasksList });

            cache.writeQuery({
                query: tasksList,
                data: {
                    tasks: [createTask, ...tasks],
                },
            });
        },
    });
    const schema = Yup.object().shape({
        title: Yup.string().required('Введите заголовок'),
        desc: Yup.string().required('Введите описание'),
    });
    const formik = useFormik({
        initialValues: {
            title: '',
            desc: '',
        },
        validationSchema: schema,
        onSubmit: (values) => {
            const { title, desc } = values;
            addTask({
                variables: {
                    input: { title, desc },
                },
            });
        },
    });
    const { values, errors, handleSubmit, handleChange, touched } = formik;
    return (
        <form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={5}>
                    <FormControl fullWidth>
                        <TextField
                            name="title"
                            id="filled-basic"
                            label="Текст задачи"
                            aria-describedby="error-title"
                            variant="filled"
                            value={values.title}
                            onChange={handleChange}
                        />
                    </FormControl>
                    {errors.title && touched.title && (
                        <FormHelperText error id="error-title" sx={{ position: 'absolute', marginLeft: '12px' }}>
                            {errors.title}
                        </FormHelperText>
                    )}
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
                    {errors.desc && touched.desc && (
                        <FormHelperText error id="error-desc" sx={{ position: 'absolute', marginLeft: '12px' }}>
                            {errors.desc}
                        </FormHelperText>
                    )}
                </Grid>
                <Grid item xs={2}>
                    <Button
                        type="submit"
                        fullWidth
                        style={{ height: '100%', borderRadius: 0 }}
                        variant="contained"
                        color="primary"
                    >
                        Добавить
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default TaskCreate;
