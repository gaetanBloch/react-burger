import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types'

import styles from './Modal.module.css'
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return nextProps.show !== this.props.show || nextProps.children !== this.props.children
  }

  render() {
    return (
      <Fragment>
        <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
        <div
          className={styles.Modal}
          style={{
            transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: this.props.show ? 1 : 0
          }}>
          {this.props.children}
        </div>
      </Fragment>
    );
  }
}

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  modalClosed: PropTypes.func.isRequired
}

export default Modal;
