import * as React from 'react';
import { Route } from 'react-router-dom';
import Configuration from './components/Configuration'

const customRoutes = [
    <Route exact path="/configuration" render={() => <Configuration />} />
];

export default  customRoutes