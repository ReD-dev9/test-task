import { createBrowserRouter } from 'react-router-dom';
import { TaskOne, TaskView } from './pages';
import { Home } from '../layouts';

export default createBrowserRouter([
    {
        element: <Home />,
        children: [
            {
                path: '/',
                element: <TaskView />,
            },
            {
                path: 'task/:id',
                element: <TaskOne />,
            },
        ],
    },
]);
