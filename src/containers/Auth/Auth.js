import React, { Component } from 'react';
import { initializeFormElement } from '../formUtils';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';

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
        { isEmail: true, minLength: 6 },
        'password',
      ),
    },
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
      <form onSubmit={this.orderHandler}>
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
        <Button buttonType="Success">Login</Button>
      </form>
    );

    return (
      <div>
        <h2>Login</h2>
        {form}
      </div>
    );
  }
}

export default Auth;
