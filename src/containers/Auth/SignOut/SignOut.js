import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

import * as actions from '../../../store/actions/index';

const SignOut = props => {

  const { onSignOut } = props;

  useEffect(() => {
    onSignOut();
  }, [onSignOut]);

  return <Redirect to="/auth" />;
};

const mapDispatchToProps = dispatch => {
  return {
    onSignOut: () => dispatch(actions.initiateSignOut())
  };
};

export default connect(null, mapDispatchToProps)(SignOut);
