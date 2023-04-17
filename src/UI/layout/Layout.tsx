import React from 'react';
import classes from './Layout.module.scss';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = (props: LayoutProps) => {
    return <main className={classes.main}>{props.children}</main>;
};

export default Layout;