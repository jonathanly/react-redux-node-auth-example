import React from 'react';
import { connect } from 'react-redux';
import { fetchMessage } from '../actions';

class Feature extends React.Component {
  componentWillMount() {
    this.props.fetchMessage();
  }

  render() {
    return (
      <div>
        <h4>Linda smells like poo</h4>
        <p>{this.props.message}</p>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { message: state.auth.message };
}

export default connect(mapStateToProps, { fetchMessage })(Feature);
