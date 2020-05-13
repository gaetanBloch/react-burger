import React, { Component } from 'react';

import Aux from '../ReactAux/ReactAux';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null
    }

    constructor(props) {
      super(props);
      axios.interceptors.request.use(reqConfig => {
        this.setState({error: null});
        return reqConfig;
      });
      axios.interceptors.response.use(response => response, error => {
        this.setState({error: error});
        return Promise.reject(error);
      });
    }

    errorConfirmedHandler = () => {
      this.setState({error: null});
    };

    render() {
      return (
        <Aux>
          <Modal show={this.state.error !== null} modalClosed={this.errorConfirmedHandler}>
            {this.state.error?.message}
          </Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      );
    }
  }
};

export default withErrorHandler;
