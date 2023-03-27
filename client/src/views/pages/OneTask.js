import React, { useEffect } from 'react';
import { Card } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { TaskEdit } from '../../components';
import { getOneTask } from '../../actions/tasksActions';

const OneTask = item => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getOneTask(item.match.params.id));
    }, [dispatch]);
    return (
        <Card>
            <TaskEdit />
        </Card>
    )
}

export default OneTask;