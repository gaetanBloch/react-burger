import React, { useEffect, useState } from 'react';

import Aux from '../ReactAux/ReactAux';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
  return (props) => {

    const [state, setState] = useState({error: null});

    useEffect(() => {
      let reqInterceptor = axios.interceptors.request.use(reqConfig => {
        setState({error: null});
        return reqConfig;
      });
      let resInterceptor = axios.interceptors.response.use(response => response, error => {
        setState({error: error});
        return Promise.reject(error);
      });

      return () => {
        console.log('Will Unmount', reqInterceptor, resInterceptor);
        axios.interceptors.request.eject(reqInterceptor);
        axios.interceptors.response.eject(resInterceptor);
      }
    })

    const errorConfirmedHandler = () => {
      setState({error: null});
    };

    return (
      <Aux>
        <Modal show={state.error !== null} modalClosed={errorConfirmedHandler}>
          {state.error?.message}
        </Modal>
        <WrappedComponent {...props} />
      </Aux>
    );
  }
};

export default withErrorHandler;
