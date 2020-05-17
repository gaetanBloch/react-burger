import React, { Component, Fragment } from 'react';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null
    }
    reqInterceptor;
    resInterceptor;

    constructor(props) {
      super(props);
      this.reqInterceptor = axios.interceptors.request.use(reqConfig => {
        this.setState({error: null});
        return reqConfig;
      });
      this.resInterceptor = axios.interceptors.response.use(response => response, error => {
        this.setState({error: error});
        return Promise.reject(error);
      });
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }

    errorConfirmedHandler = () => {
      this.setState({error: null});
    };

    render() {
      return (
        <Fragment>
          <Modal show={this.state.error !== null} modalClosed={this.errorConfirmedHandler}>
            {this.state.error?.message}
          </Modal>
          <WrappedComponent {...this.props} />
        </Fragment>
      );
    }
  }
};

export default withErrorHandler;
