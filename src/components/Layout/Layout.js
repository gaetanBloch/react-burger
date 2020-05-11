import React from 'react';

import Aux from '../../hoc/ReactAux';
import styles from './Layout.module.css'

const Layout = (props) => (
  <Aux>
    <div>Toolbar, SideDrawer, Backdrop</div>
    <main className={styles.Content}>
      {props.children}
    </main>
  </Aux>
);

export default Layout;
