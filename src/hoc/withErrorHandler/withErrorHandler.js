import React, { Fragment } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import useHttpErrorHandler from '../../hooks/htttp-error-handler';

const withErrorHandler = (WrappedComponent, axios) => {
  return props => {

    const [error, clearError] = useHttpErrorHandler(axios);

    return (
      <Fragment>
        <Modal show={error !== null}
               modalClosed={clearError}>
          {error?.message}
        </Modal>
        <WrappedComponent {...props} />
      </Fragment>
    );
  };
};

export default withErrorHandler;
