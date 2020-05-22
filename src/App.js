import React, { useEffect } from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router';
import { connect } from 'react-redux';

import styles from './App.modules.css';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import SignOut from './containers/Auth/SignOut/SignOut';
import * as actions from './store/actions/index';
import asyncComponent from './asyncComponent/asyncComponent';

const asyncCheckout = asyncComponent(() => {
  return import('./containers/Checkout/Checkout');
});

const asyncOrders = asyncComponent(() => {
  return import('./containers/Orders/Orders');
});

const asyncAuth = asyncComponent(() => {
  return import('./containers/Auth/Auth');
});

const asyncContactData = asyncComponent(() => {
  return import('./containers/Checkout/ContactData/ContactData');
});

const App = (props) => {

  const { onTryAutoSignIn } = props;

  useEffect(() => {
    onTryAutoSignIn();
  }, [onTryAutoSignIn]);

  let routes = (
    <Switch>
      <Route path="/auth" component={asyncAuth} />
      <Route path="/" component={BurgerBuilder} exact />
      <Redirect to='/' />
    </Switch>
  );
  if (props.isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/checkout" component={asyncCheckout} exact />
        <Route path="/checkout/contact-data" component={asyncContactData} />
        <Route path="/orders" component={asyncOrders} />
        <Route path="/sign-out" component={SignOut} />
        <Route path="/auth" component={asyncAuth} />
        <Route path="/" component={BurgerBuilder} exact />
        <Redirect to='/' />
      </Switch>
    );
  }

  return (
    <div className={styles.App}>
      <Layout>
        {routes}
      </Layout>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignIn: () => dispatch(actions.authCheckState())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
