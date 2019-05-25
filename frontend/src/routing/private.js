import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { getDataAuthUser } from '../services/localDb';

const PrivateRouter = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            getDataAuthUser()
                ? <Component {...props} />
                : <Redirect to="/auth" />
        }
    />
);

export default PrivateRouter;
