import { FC, useState } from 'react';
import {
    IconButton,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    Typography,
    Dialog,
    DialogContent,
} from '@mui/material';
import { useMutation, ApolloCache } from '@apollo/client';
import { Delete, Edit } from '@mui/icons-material';
import { deleteTasks } from './const';
import TaskEdit from '../Update';
import Moment from 'react-moment';

import { TTask } from '../TypesTask';

const TaskItem: FC<{ task: TTask }> = ({ task }) => {
    const [open, setOpen] = useState<boolean>(false);
    const [delTask] = useMutation(deleteTasks, {
        update(cache: ApolloCache<TTask>, { data: { deleteTask } }) {
            cache.modify({
                fields: {
                    tasks(currentTask = []) {
                        return currentTask.filter((task: any) => task.__ref !== `Task:${deleteTask.id}`);
                    },
                },
            });
        },
    });

    const handleClickOpen = (): void => {
        setOpen(true);
    };

    const handleClose = (): void => {
        setOpen(false);
    };

    const deleteSubmit = (id: number) => {
        delTask({ variables: { deleteTaskId: +(id ?? -1) } });
    };

    return (
        <>
            <ListItem alignItems="flex-start">
                <ListItemText
                    primary={task.title}
                    secondary={
                        <>
                            <Typography
                                component="span"
                                variant="body2"
                                sx={{ display: 'inline' }}
                                color="textPrimary"
                            ></Typography>
                            {task.desc} - <Moment format="YYYY:MM:DD">{task.date}</Moment>
                        </>
                    }
                />
                <ListItemSecondaryAction>
                    <IconButton onClick={handleClickOpen} edge="end" aria-label="edit">
                        <Edit />
                    </IconButton>
                    <IconButton onClick={() => deleteSubmit(task.id)} edge="end" aria-label="delete">
                        <Delete />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
            <Dialog open={open} onClose={handleClose} aria-describedby="alert-dialog-slide-description">
                <DialogContent>
                    <TaskEdit task={task} onClose={handleClose} />
                </DialogContent>
            </Dialog>
        </>
    );
};

export default TaskItem;
