import { FC } from 'react';
import { TextField, FormControl, Button, Grid } from '@mui/material';
import { Send } from '@mui/icons-material';
import { useMutation, ApolloCache } from '@apollo/client';
import { useFormik } from 'formik';
import { updateTasks, tasksList, validationTask } from './const';

import { TTask, ITasks } from '../TypesTask';

const TaskUpdate: FC<{ onClose: () => void; task?: TTask }> = ({ onClose, task }) => {
    const [modifyTask] = useMutation(updateTasks, {
        update(cache: ApolloCache<ITasks>, { data: { updateTask } }) {
            const { tasks } = cache.readQuery<any>({ query: tasksList });
            if (task?.id) {
                cache.modify({
                    fields: {
                        tasks(currentTask = []) {
                            return currentTask.filter((item: TTask) =>
                                +updateTask.id === +item.id ? updateTask : item,
                            );
                        },
                    },
                });
            } else {
                cache.writeQuery({
                    query: tasksList,
                    data: {
                        tasks: [updateTask, ...tasks],
                    },
                });
            }
        },
    });
    const formik = useFormik({
        initialValues: {
            title: task?.title ?? '',
            desc: task?.desc ?? '',
        },
        validationSchema: validationTask,
        onSubmit: (values) => {
            const { title, desc } = values;
            modifyTask({
                variables: {
                    input: { title, desc },
                    updateTaskId: Number(task?.id),
                },
            });
            onClose();
        },
    });
    const { values, errors, handleSubmit, handleChange, touched } = formik;
    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <TextField
                            name="title"
                            label="Текст задачи"
                            value={values.title}
                            onChange={handleChange}
                            helperText={touched.title && errors.title}
                            error={Boolean(errors.title) && touched.title}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <TextField
                            name="desc"
                            label="Описание задачи"
                            value={values.desc}
                            onChange={handleChange}
                            helperText={touched.desc && errors.desc}
                            error={Boolean(errors.desc) && touched.desc}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={2}>
                    <Button type="submit" variant="contained" endIcon={<Send />}>
                        Отправить
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default TaskUpdate;
