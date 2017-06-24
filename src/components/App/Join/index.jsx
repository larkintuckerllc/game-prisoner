import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { reduxForm } from 'redux-form';
import styles from './index.css';

const JOIN_FORM = 'JOIN_FORM';
const Join = ({ handleSubmit, submitting }) => (
  <div id={styles.root}>
    <form id={styles.rootForm} onSubmit={handleSubmit}>
      <div className="form-group">
        <button
          type="submit"
          disabled={submitting}
          className="btn btn-primary"
        >Join</button>
      </div>
    </form>
  </div>
);
Join.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
};
const JoinForm = reduxForm({
  form: JOIN_FORM,
})(Join);
class JoinSubmit extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit() {
    const { onJoin } = this.props;
    onJoin().catch((error) => {
      if (process.env.NODE_ENV !== 'production' && error.name !== 'ServerException') {
        window.console.log(error);
      }
    });
  }
  render() {
    return (
      <JoinForm
        onSubmit={this.handleSubmit}
      />
    );
  }
}
JoinSubmit.propTypes = {
  onJoin: PropTypes.func.isRequired,
};
export default JoinSubmit;
