import React from 'react';
import PropTypes from 'prop-types'

const DrawerToggle = (props) => (
  <button onClick={props.clicked}>Toggle</button>
);

DrawerToggle.propTypes = {
  clicked: PropTypes.func.isRequired
}

export default DrawerToggle;
