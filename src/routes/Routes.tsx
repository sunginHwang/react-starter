import React from 'react';
import {Route, Switch} from 'react-router';
import loadable from '@loadable/component';

const TodoPage = loadable(() => import('../pages/todo'));
const HomePage = loadable(() => import('../pages/Home'));

function Routes() {

    return (
        <Switch>
            <Route path="/" component={HomePage} exact/>
            <Route path="/todo" component={TodoPage}/>
        </Switch>
    );
};

export default Routes;


