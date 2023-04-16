import { Link } from 'react-router-dom';
import { IconButton, ListItem, ListItemSecondaryAction, ListItemText, Typography } from '@mui/material';
import { useMutation, ApolloCache } from '@apollo/client';
import { Delete, Edit } from '@mui/icons-material';
import { deleteTasks, tasksList } from './const';
import Moment from 'react-moment';

const TaskItem = ({ task }: any): any => {
    const [delTask] = useMutation(deleteTasks, {
        update(cache: ApolloCache<any>) {
            const { tasks } = cache.readQuery({ query: tasksList });
            cache.writeQuery({
                query: tasksList,
                data: {
                    tasks: [...tasks],
                },
            });
        },
    });
    const deleteSubmit = (id: any) => {
        delTask({ variables: { deleteTaskId: +(id ?? -1) } });
    };
    return (
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
                <Link to={`/task/${task.id}`}>
                    <IconButton edge="end" aria-label="edit">
                        <Edit />
                    </IconButton>
                </Link>
                <IconButton onClick={() => deleteSubmit(task.id)} edge="end" aria-label="delete">
                    <Delete />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );
};

export default TaskItem;
