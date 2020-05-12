import React from 'react';

import burgerLogo from '../../assets/images/burger-logo.png'
import styles from './Logo.module.css'

const Logo = (props) => (
  <div>
    <img src={burgerLogo} alt="BurgerBuilder" className={styles.Logo} />
  </div>
);

export default Logo;
