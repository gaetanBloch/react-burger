import React from 'react';

import styles from './Toolbar.module.css'
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

const Toolbar = (props) => (
  <header role="navigation" className={styles.Toolbar}>
    <div>MENU</div>
    <Logo />
    <NavigationItems />
  </header>
);

export default Toolbar;
