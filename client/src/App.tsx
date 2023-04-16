import { RouterProvider } from 'react-router-dom';
import routes from './views';

const App = () => {
    return <RouterProvider router={routes} />;
};

export default App;
