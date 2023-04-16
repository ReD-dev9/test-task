import { List } from '@mui/material';
import TaskItem from '../Item';

const TaskList = ({ items }: any) => {
    return (
        <List>
            {items?.map((task: any, index: number) => {
                return <TaskItem task={task} key={index} />;
            })}
        </List>
    );
};

export default TaskList;
