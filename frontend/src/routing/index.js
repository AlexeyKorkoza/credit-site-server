import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { getDataAuthUser } from '../services/localDb';

const accessRoles = ['admin', 'manager'];

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

const PrivateRouterRole = ({ component: Component, accessRole, ...rest }) => {
    const isAccess = accessRoles.includes(accessRole);

    if (!isAccess) {
        return (
          <Redirect to='/profile' />
        );
    }

    const { role: userRole } = getDataAuthUser();
    const isCompare = !!(accessRole === userRole);

    if (!isCompare) {
        return (
          <Redirect to='/profile' />
        );
    }

    return (
      <Route
        {...rest}
        render={props => <Component {...props} />}
      />
    );
};

export {
    PrivateRouter,
    PrivateRouterRole,
}
