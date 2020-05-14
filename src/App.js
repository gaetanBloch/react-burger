import React, { Component } from 'react';

import styles from './App.modules.css';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';

class App extends Component {
  render() {
    return (
      <div className={styles.App}>
        <Layout>
          <BurgerBuilder />
          <Checkout />
        </Layout>
      </div>
    )
  }
}

export default App;
