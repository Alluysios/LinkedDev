import React, { Fragment } from 'react';
import spinner from './spinner.gif';

export default () => (
    <Fragment>
        <img
            src={spinner}
            style={{ width: '25px', margin: 'auth', display: 'block' }}
            alt='Loading...'
        />
    </Fragment>
);