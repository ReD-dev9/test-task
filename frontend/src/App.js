import React from 'react';
// import Routes from './routes/routes';
import { Switch } from "react-router-dom";
// import styles from './App.module.scss';
import { Tasks, Auth,  OneTask } from './views';
import HomeLayout from "./layouts/HomeLayout";
import { PublicRoute, PrivateRoute } from "./routes";

function App() {
    return (
         <Switch>
             <PublicRoute exact path="/login" component={Auth} />
             <PrivateRoute exact path="/" component={Tasks} layout={HomeLayout} />
             <PrivateRoute exact path="/one_task/:id" component={OneTask} layout={HomeLayout} />
         </Switch>
    );
}

export default App;
