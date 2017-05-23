import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { signInUser } from '../../actions';

class SignIn extends React.Component {
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
    this.props.signInUser(values, history);
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
        <button type="submit" className="btn btn-primary">Sign In</button>
      </form>
    )
  }
}

function validate(values) {
  const { email, password } = values;
  const errors = {};

  if(!email) {
    errors.email = "Please enter an email"
  }
  if(!password) {
    errors.password = "Please enter your password"
  }

  return errors
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

export default reduxForm({
  validate,
  form: 'SignInForm'
})(
  connect(mapStateToProps, { signInUser })(SignIn)
);
