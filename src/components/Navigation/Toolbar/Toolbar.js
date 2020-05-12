import React from 'react';

import styles from './Toolbar.module.css'
import Logo from '../../Logo/Logo';

const Toolbar = (props) => (
  <header role="navigation" className={styles.Toolbar}>
    <div>MENU</div>
    <Logo />
    <nav>
      ...
    </nav>
  </header>
);

export default Toolbar;
