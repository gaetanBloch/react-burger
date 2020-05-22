import React, { Fragment, useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';

import { handleChangedForm, initializeFormElement } from '../formUtils';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import styles from './Auth.module.css';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';

const Auth = props => {

  const [controls, setControls] = useState({
    email: initializeFormElement(
      'Mail address',
      'email',
      'e-mail address',
      { isEmail: true },
      'ex: gaetan.bloch@gmail.com',
    ),
    password: initializeFormElement(
      'Password',
      'password',
      'Password',
      { minLength: 6 },
      '',
      'password',
    ),
  });
  const [formIsValid, setFormIsValid] = useState(false);
  const [signInMode, setSignInMode] = useState(true);

  const { buildingBurger, authRedirectPath, onSetAuthRedirectPath } = props;

  useEffect(() => {
    if (!buildingBurger && authRedirectPath !== '/') {
      onSetAuthRedirectPath();
    }
  }, [buildingBurger, authRedirectPath, onSetAuthRedirectPath]);

  const inputChangedHandler = (event, inputId) => {
    handleChangedForm(event, inputId, controls, setControls, setFormIsValid);
  };

  const submitHandler = (event) => {
    // Prevent reloading of the page
    event.preventDefault();

    if (signInMode) {
      props.onSignIn(controls.email.value, controls.password.value);
    } else {
      props.onSignUp(controls.email.value, controls.password.value);
    }
  };

  const switchAuthModeHandler = () => {
    setSignInMode(prevSignInMode => !prevSignInMode);
    setControls(prevControls => {
      return {
        ...prevControls,
        password: {
          ...prevControls.password, value: '',
          valid: false,
          touched: false
        }
      };
    });
    setFormIsValid(false);
  };

  const inputs = [];
  Object.keys(controls).forEach(key => {
    inputs.push({
      id: key,
      config: controls[key],
    });
  });

  let form = (
    <Fragment>
      <form onSubmit={submitHandler}>
        {inputs.map(input => (
          <Input
            key={input.id}
            label={input.config.label}
            id={input.config.id}
            elementType={input.config.elementType}
            elementConfig={input.config.elementConfig}
            value={input.config.value}
            invalid={!input.config.valid}
            shouldValidate={input.config.validation}
            touched={input.config.touched}
            valueType={input.config.valueType}
            changed={(event) => inputChangedHandler(event, input.id)} />
        ))}
        <Button buttonType="Success" disabled={!formIsValid}>
          {signInMode ? 'SIGN IN' : 'SIGN UP'}
        </Button>
      </form>
      <Button buttonType="Danger" clicked={switchAuthModeHandler}>
        SWITCH TO {signInMode ? 'SIGN UP' : 'SIGN IN'}
      </Button>
    </Fragment>
  );

  if (props.loading) {
    form = <Spinner />;
  }

  let errorMessage = null;
  if (props.error) {
    errorMessage = (
      <p className={styles.ErrorMessage}>{props.error}</p>
    );
  }

  let authRedirect = null;
  if (props.isAuthenticated) {
    authRedirect = <Redirect to={props.authRedirectPath} />;
  }

  return (
    <div className={styles.Auth}>
      {authRedirect}
      <h1>{signInMode ? 'Sign in' : 'Sign up'}</h1>
      {errorMessage}
      {form}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    buildingBurger: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSignIn: (email, password) => dispatch(actions.signIn(email, password)),
    onSignUp: (email, password) => dispatch(actions.signUp(email, password)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
