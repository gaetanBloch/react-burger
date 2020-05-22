import React, { lazy, Suspense, useEffect } from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router';
import { connect } from 'react-redux';

import styles from './App.modules.css';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import SignOut from './containers/Auth/SignOut/SignOut';
import * as actions from './store/actions/index';

const Checkout = lazy(() =>
  import('./containers/Checkout/Checkout'));

const Orders = lazy(() =>
  import('./containers/Orders/Orders'));

const Auth = lazy(() =>
  import('./containers/Auth/Auth'));

const ContactData = lazy(() =>
  import('./containers/Checkout/ContactData/ContactData'));

const App = (props) => {

  const { onTryAutoSignIn } = props;

  useEffect(() => {
    onTryAutoSignIn();
  }, [onTryAutoSignIn]);

  let routes = (
    <Switch>
      <Route path="/auth" component={Auth} />
      <Route path="/" component={BurgerBuilder} exact />
      <Redirect to='/' />
    </Switch>
  );
  if (props.isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/checkout" component={Checkout} exact />
        <Route path="/checkout/contact-data" component={ContactData} />
        <Route path="/orders" component={Orders} />
        <Route path="/sign-out" component={SignOut} />
        <Route path="/auth" component={Auth} />
        <Route path="/" component={BurgerBuilder} exact />
        <Redirect to='/' />
      </Switch>
    );
  }

  return (
    <div className={styles.App}>
      <Layout>
        <Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>
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
