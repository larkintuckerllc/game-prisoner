import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';

const Join = ({ onJoin }) => (
  <div id={styles.root}>
    <button
      className="btn btn-primary"
      onClick={onJoin}
    >Join</button>
  </div>
);
Join.propTypes = {
  onJoin: PropTypes.func.isRequired,
};
export default Join;
