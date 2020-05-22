import React, { Fragment, useEffect, useState } from 'react';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
  return props => {
    let reqInterceptor = null;
    let resInterceptor = null;

    const [error, setError] = useState(null);

    useEffect(() => {
      return () => {
        axios.interceptors.request.eject(reqInterceptor);
        axios.interceptors.response.eject(resInterceptor);
      };
    }, [reqInterceptor, resInterceptor]);

    reqInterceptor = axios.interceptors.request.use(reqConfig => {
      setError(null);
      return reqConfig;
    });
    resInterceptor = axios.interceptors.response.use(
      response => response,
      err => {
        setError(err);
        return Promise.reject(err);
      });

    const errorConfirmedHandler = () => {
      setError(null);
    };

    return (
      <Fragment>
        <Modal show={error !== null}
               modalClosed={errorConfirmedHandler}>
          {error?.message}
        </Modal>
        <WrappedComponent {...props} />
      </Fragment>
    );
  };
};

export default withErrorHandler;
