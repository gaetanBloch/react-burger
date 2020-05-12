import React from 'react';

import Aux from '../../hoc/ReactAux';
import styles from './Layout.module.css'
import Toolbar from '../Navigation/Toolbar/Toolbar';

const Layout = (props) => (
  <Aux>
    <Toolbar />
    <main className={styles.Content}>
      {props.children}
    </main>
  </Aux>
);

export default Layout;
