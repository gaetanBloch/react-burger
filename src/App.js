import React, { Component } from 'react';
import { Route, Switch } from 'react-router';

import styles from './App.modules.css';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import SignOut from './containers/Auth/SignOut/SignOut';

class App extends Component {
  componentDidMount () {

  }

  render () {
    return (
      <div className={styles.App}>
        <Layout>
          <Switch>
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} />
            <Route path="/auth" component={Auth} />
            <Route path="/sign-out" component={SignOut} />
            <Route path="/" component={BurgerBuilder} exact />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
