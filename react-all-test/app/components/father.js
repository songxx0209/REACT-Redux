import React, {Component} from 'react';
import { dispatch } from 'redux';
import { connect } from 'react-redux';
import { changeOne, changeTow, changeThree, changeFour } from '../actions/testAction';
import Son from './son';

class Login extends Component {

  componentWillMount() {
    console.log('father will mount');
  }
  componentDidMount() {
    console.log('father did mount');
  }
  btn() {
    // console.log('ss');
    this.props.dispatch(changeTow('father'));
  }
  render() {
    console.log('father');
    const { data } = this.props;
    return (
      <div>
        {/* <p>{this.props.title}</p> */}
        <p>{data.test.tow}</p>
        <p>{this.props.ab}</p>
        <button onClick={this.btn.bind(this)}>btn</button>
        <hr/>
        <Son />
      </div>
    );
  }
}

function mapStateToProps(state) {
  // console.log('father', state);
  return {data: state};
}

export default connect(
  mapStateToProps,
)(Login);