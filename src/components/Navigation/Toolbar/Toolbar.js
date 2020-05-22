import React from 'react';
import PropTypes from 'prop-types';

import styles from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const Toolbar = props => (
  <header role="navigation" className={styles.Toolbar}>
    <DrawerToggle clicked={props.drawerToggleClicked} />
    <div className={styles.Logo}>
      <Logo />
    </div>
    <div className={styles.DesktopOnly}>
      <NavigationItems isAuthenticated={props.isAuth} />
    </div>
  </header>
);

Toolbar.propTypes = {
  drawerToggleClicked: PropTypes.func.isRequired
};

export default Toolbar;
