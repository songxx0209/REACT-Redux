import React, {Component} from 'react';
import { dispatch } from 'redux';
import { connect } from 'react-redux';
import { changeOne, changeTow, changeThree, changeFour } from '../actions/testAction';
import Grandson from './grandson';

export default class Login extends Component {

  btn() {
    // console.log('ss');
    // this.props.dispatch(changeThree('son'));
  }
  render() {
    console.log('son');
    const { data } = this.props;
    return (
      <div>
         {/* <p>{data.back.three}</p> */}
        <p>slslslslssll</p>
        <button onClick={this.btn.bind(this)}>btn</button>
        <hr/>
        <Grandson />
      </div>
    );
  }
}

function mapStateToProps(state) {
  // console.log('son', state);
  return {data: state};
}

// export default connect(
//   mapStateToProps,
// )(Login);