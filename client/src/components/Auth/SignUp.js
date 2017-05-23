import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { signUpUser } from '../../actions';

class SignUp extends React.Component {
  renderField(field) {
    const { touched, error } = field.meta;
    const className = `form-group ${ touched && error ? 'has-danger' : '' }`;

    return (
      <div className={className}>
        <label>{field.label}</label>
        <input
          className="form-control"
          type={field.type}
          {...field.input}
        />
        <div className="text-help">
          {touched ? error : ''}
        </div>
      </div>
    )
  }

  renderAlert = () => {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      );
    }
  }

  onSubmit = (values) => {
    const { history } = this.props;
    this.props.signUpUser(values, history);
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        {this.renderAlert()}
        <Field
          label="Email"
          name="email"
          type="text"
          component={this.renderField}
        />
        <Field
          label="Password"
          name="password"
          type="password"
          component={this.renderField}
        />
        <Field
          label="Password Confirmation"
          name="passwordConfirmation"
          type="password"
          component={this.renderField}
        />
        <button type="submit" className="btn btn-primary">Sign In</button>
      </form>
    )
  }
}

function validate(values) {
  const { email, password, passwordConfirmation } = values;
  const errors = {};

  if (!email) {
    errors.email = "Please enter an email"
  }
  if (!password) {
    errors.password = "Please enter a password"
  }
  if (!passwordConfirmation) {
    errors.passwordConfirmation = "Please enter a password confirmation"
  }
  if (password !== passwordConfirmation) {
    errors.password = "The passwords do not match"
  }

  return errors
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

export default reduxForm({
  validate,
  form: 'SignUpForm'
})(
  connect(mapStateToProps, { signUpUser })(SignUp)
);
