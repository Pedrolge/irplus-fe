import * as React from 'react';
import { Layout, LayoutProps } from 'react-admin';
import AppBar from './AppBar';

const CustomLayout = (props: LayoutProps) => {
    return (
        <Layout
            {...props}
            appBar={AppBar}
        />
    );
};

export default CustomLayout