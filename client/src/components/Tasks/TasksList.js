import React, { useEffect } from 'react';
import { List } from '@material-ui/core';
import { connect, useDispatch } from 'react-redux';
import { TaskItem } from '../../components';
import { getTasks } from '../../actions/tasksActions';

const TasksList = ({tasks}) =>  {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getTasks());
    }, [dispatch]);
    return (
        <List>
            {
                tasks.map((task, index) => {
                    return (
                        <TaskItem task={task} key={index} />
                    );
                })
            }
        </List>
    )
}

const mapStateToProps = state => {
    return {
        tasks: state.tasks.tasks
    }
}

export default connect(mapStateToProps, null)(TasksList);
