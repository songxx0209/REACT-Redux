import React, {Component} from 'react';
import { dispatch } from 'redux';
import { connect } from 'react-redux';
import { changeOne, changeTow, changeThree, changeFour } from '../actions/testAction';

class Login extends Component {

  btn() {
    // console.log('ss');
    this.props.dispatch(changeFour('i am grandson'));
  }
  render() {
    console.log('granson');
    const { data } = this.props;
    return (
      <div>
        <p>{data.back.four}</p>
        <button onClick={this.btn.bind(this)}>btn</button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  // console.log('grandson', state);
  return {data: state};
}

export default connect(
  mapStateToProps,
)(Login);