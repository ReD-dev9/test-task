import { FC } from 'react';
import { RouterProvider } from 'react-router-dom';
import routes from './views';

const App: FC = () => {
    return <RouterProvider router={routes} />;
};

export default App;
