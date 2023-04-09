import React from 'react';
import { Card, CardContent } from '@material-ui/core';
import { TasksList, TaskCreate } from '../../components';

const Tasks = () => {
    return (
        <Card>
            <TaskCreate />
            <CardContent>
                <TasksList/>
            </CardContent>
        </Card>
    )
}

export default Tasks;
