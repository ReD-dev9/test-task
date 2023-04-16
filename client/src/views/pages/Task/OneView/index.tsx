import { Card } from '@mui/material';
import { useQuery } from '@apollo/client';
import { oneTask } from './const';
import TaskEdit from '../Edit';
import { useParams } from 'react-router-dom';

const OneTask = () => {
    const { id: Id } = useParams();
    const { loading, error, data } = useQuery(oneTask, {
        variables: {
            oneTaskId: +(Id ?? -1),
        },
    });
    return <Card>{!loading && <TaskEdit task={data?.oneTask} />}</Card>;
};

export default OneTask;
