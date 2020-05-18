import React, { Component } from 'react';
import { connect } from 'react-redux';

import { handleChangedForm, initializeFormElement } from '../formUtils';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import styles from './Auth.module.css';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

export class Auth extends Component {
  state = {
    controls: {
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
    },
    formIsValid: false,
    signInMode: true
  };

  inputChangedHandler = (event, inputId) => {
    handleChangedForm(event, inputId, 'controls', this);
  };

  submitHandler = (event) => {
    // Prevent reloading of the page
    event.preventDefault();

    if (this.state.signInMode) {
      this.props.onSignIn(
        this.state.controls.email.value,
        this.state.controls.password.value
      );
    } else {
      this.props.onSignUp(
        this.state.controls.email.value,
        this.state.controls.password.value
      );
    }
  };

  switchAuthModeHandler = () => {
    this.setState(prevState => ({
      signInMode: !prevState.signInMode,
      controls: {
        ...prevState.controls,
        password: {
          ...prevState.controls.password, value: ''
        }
      }
    }));
  };

  render () {
    const inputs = [];
    Object.keys(this.state.controls).forEach(key => {
      inputs.push({
        id: key,
        config: this.state.controls[key],
      });
    });

    let form = (
      <form onSubmit={this.submitHandler}>
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
            changed={(event) => this.inputChangedHandler(event, input.id)} />
        ))}
        <Button buttonType="Success" disabled={!this.state.formIsValid}>
          {this.state.signInMode ? 'SIGN IN' : 'SIGN UP'}
        </Button>
      </form>
    );

    if (this.props.loading) {
      form = <Spinner />;
    }

    let errorMessage = null;
    if (this.props.error) {
      errorMessage = (
        <p className={styles.ErrorMessage}>{this.props.error}</p>
      );
    }

    return (
      <div className={styles.Auth}>
        <h1>{this.state.signInMode ? 'Sign in' : 'Sign up'}</h1>
        {errorMessage}
        {form}
        <Button buttonType="Danger" clicked={this.switchAuthModeHandler}>
          SWITCH TO {this.state.signInMode ? 'SIGN UP' : 'SIGN IN'}
        </Button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSignIn: (email, password) => dispatch(actions.signIn(email, password)),
    onSignUp: (email, password) => dispatch(actions.signUp(email, password))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
