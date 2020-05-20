import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

import * as actions from '../../../store/actions/index';

export class SignOut extends Component {

  componentDidMount () {
    this.props.onSignOut();
  }

  render () {
    return <Redirect to="/auth" />;
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSignOut: () => dispatch(actions.initiateSignOut())
  };
};

export default connect(null, mapDispatchToProps)(SignOut);
