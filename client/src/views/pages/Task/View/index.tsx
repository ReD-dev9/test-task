import { useQuery } from '@apollo/client';
import { tasks } from './const';
import { Card, CardContent } from '@mui/material';

import TaskList from '../List';
import TaskCreate from '../Create';

const Tasks = () => {
    const { loading, error, data } = useQuery(tasks);
    return (
        <Card>
            {!loading && (
                <>
                    <TaskCreate />
                    <CardContent>
                        <TaskList items={data.tasks} />
                    </CardContent>
                </>
            )}
        </Card>
    );
};

export default Tasks;
