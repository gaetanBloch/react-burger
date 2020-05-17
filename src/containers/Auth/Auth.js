import React, { Component } from 'react';
import { connect } from 'react-redux';

import { handleChangedForm, initializeFormElement } from '../formUtils';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import styles from './Auth.module.css';
import * as actions from '../../store/actions/index';

export class Auth extends Component {
  state = {
    controls: {
      email: initializeFormElement(
        'Mail address',
        'e-mail address',
        { isEmail: true },
        'email',
      ),
      password: initializeFormElement(
        'Password',
        'password',
        { minLength: 6 },
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
      signInMode: !prevState.signInMode
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

    return (
      <div className={styles.Auth}>
        <h1>{this.state.signInMode ? 'Sign in' : 'Sign up'}</h1>
        {form}
        <Button buttonType="Danger" clicked={this.switchAuthModeHandler}>
          SWITCH TO {this.state.signInMode ? 'SIGN UP' : 'SIGN IN'}
        </Button>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSignIn: (email, password) => dispatch(actions.signIn(email, password)),
    onSignUp: (email, password) => dispatch(actions.signUp(email, password))
  };
};

export default connect(null, mapDispatchToProps)(Auth);
