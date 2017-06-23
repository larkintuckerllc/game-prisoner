import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { reduxForm, Field } from 'redux-form';

const LOGIN_FORM = 'LOGIN_FORM';
const Login = ({ handleSubmit, submitting, submitFailed }) => (
  <form onSubmit={handleSubmit}>
    <div className="form-group">
      <Field
        component="input"
        name="id"
        type="text"
        className="form-control"
      />
    </div>
    {submitFailed && !submitting &&
      <div className="alert alert-danger">Failed to login.</div>}
    <div className="form-group">
      <button
        type="submit"
        disabled={submitting}
        className="btn btn-primary"
      >Login</button>
    </div>
  </form>
);
Login.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  submitFailed: PropTypes.bool.isRequired,
};
const LoginForm = reduxForm({
  form: LOGIN_FORM,
  enableReinitialize: true,
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
