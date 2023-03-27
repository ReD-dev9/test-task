import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton, ListItem, ListItemSecondaryAction, ListItemText, Typography} from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons';
import { useDispatch } from 'react-redux';
import { destroyTask } from '../../actions/tasksActions';
import { Link } from "react-router-dom";
import Moment from 'react-moment';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));


const TaskItem = ({task}) =>  {
    const classes = useStyles();
    const dispatch = useDispatch();

    const deleteSubmit = (id) => {
        let socket = new WebSocket('ws://localhost:5000/api/tasks/delete');
        socket.onopen = (e) => {
            socket.send(id);
        }
        socket.onmessage = function(event) {
            dispatch(destroyTask(event.data));
            console.log("Данные удалены с сервера");
        };
        socket.onclose = function(event) {
            if (event.wasClean) {
                console.log(`[close] Соединение закрыто чисто, код=${event.code} причина=${event.reason}`);
            } else {
                console.log('[close] Соединение прервано');
            }
        };
    }
    return (
        <ListItem alignItems="flex-start">
            <ListItemText
              primary={task.title}
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                  >
                  </Typography>
                    {task.desc} - <Moment format="YYYY:MM:DD">{task.date}</Moment>
                </React.Fragment>
              }
            />
            <ListItemSecondaryAction>
                <Link to={`/one_task/${task._id}`}>
                     <IconButton edge="end" aria-label="edit">
                        <Edit />
                     </IconButton>
                </Link>
                <IconButton onClick={() => deleteSubmit(task._id)} edge="end" aria-label="delete">
                    <Delete />
                </IconButton>
           </ListItemSecondaryAction>
      </ListItem>
    )
}

export default TaskItem;
