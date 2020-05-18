import React from 'react';

import styles from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = (props) => (
  <nav>
    <ul className={styles.NavigationItems}>
      {
        props.isAuthenticated ?
          <NavigationItem link="/" exact>Burger Builder</NavigationItem> :
          null
      }
      {
        props.isAuthenticated ?
          <NavigationItem link="/orders">Orders</NavigationItem> :
          null
      }
      {
        props.isAuthenticated ?
          <NavigationItem link="/sign-out">Sign out</NavigationItem> :
          <NavigationItem link="/auth">Authenticate</NavigationItem>
      }
    </ul>
  </nav>
);

export default NavigationItems;
