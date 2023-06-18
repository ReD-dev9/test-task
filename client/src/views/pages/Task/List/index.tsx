import { FC } from 'react';
import { List } from '@mui/material';
import TaskItem from '../Item';

import { ITasks, TTask } from '../TypesTask';

const TaskList: FC<ITasks> = ({ items }) => {
    return (
        <List>
            {items?.map((task: TTask, index: number) => {
                return <TaskItem task={task} key={index} />;
            })}
        </List>
    );
};

export default TaskList;
