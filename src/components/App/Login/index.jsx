import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import ValidatedTextInput from '../../ValidatedTextInput';
import styles from './index.css';

const LOGIN_FORM = 'LOGIN_FORM';
const Login = ({ handleSubmit, submitting, submitFailed, valid }) => (
  <div id={styles.root}>
    <form id={styles.rootForm} onSubmit={handleSubmit}>
      <div className="form-group">
        <Field
          component={ValidatedTextInput}
          disabled={submitting}
          name="password"
          props={{ placeholder: 'passcode' }}
        />
      </div>
      {submitFailed && !submitting &&
        <div className="alert alert-danger">Failed to login.</div>}
      <div className="form-group">
        <button
          type="submit"
          disabled={!valid || submitting}
          className="btn btn-primary"
        >Login</button>
      </div>
    </form>
  </div>
);
Login.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  submitFailed: PropTypes.bool.isRequired,
  valid: PropTypes.bool.isRequired,
};
const LoginForm = reduxForm({
  form: LOGIN_FORM,
  validate: (values) => {
    const errors = {};
    if (values.password === undefined) errors.password = '400';
    return errors;
  },
})(Login);
class LoginSubmit extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit() {
  }
  render() {
    return (
      <LoginForm
        onSubmit={this.handleSubmit}
      />
    );
  }
}
LoginSubmit.propTypes = {
};
export default LoginSubmit;
