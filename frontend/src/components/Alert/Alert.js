import React, { Fragment } from 'react'
import { useAlert } from 'react-alert'

const Alert = message => {
    const alert = useAlert();
    console.log('message', message);

    alert.show(<Fragment>{{message}}</Fragment>)
};

export default Alert;
