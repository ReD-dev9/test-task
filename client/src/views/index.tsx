import { createBrowserRouter } from 'react-router-dom';
import { TaskView } from './pages';
import { Home } from '../layouts';

export default createBrowserRouter([
    {
        element: <Home />,
        children: [
            {
                path: '/',
                element: <TaskView />,
            },
        ],
    },
]);
