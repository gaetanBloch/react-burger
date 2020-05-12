import React from 'react';

import burgerLogo from '../../assets/images/burger-logo.png'
import styles from './Logo.module.css'

const Logo = (props) => (
  <div className={styles.Logo}>
    <img src={burgerLogo} alt="BurgerBuilder" />
  </div>
);

export default Logo;
