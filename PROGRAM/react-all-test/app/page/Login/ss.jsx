import React, { Component } from 'react';
import { dispatch } from 'redux';
import { connect } from 'react-redux';

import { Button } from 'antd';
import { getData } from '../../actions/testAction';
import Father from '../../components/father';
import styles from './index.less';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'one',
    };
  }
  componentWillMount() {
    console.log('will mount');
  }

  componentDidMount() {
    console.log('did mount');
  }
  // shouldComponentUpdate() {
  //   console.log('should');
  //   return false;
  // }
  btn() {
    // console.log('ss');
    this.props.dispatch(getData());
    // this.setState({
    //   title: 'login',
    // })
  }
  render() {
    console.log('login render');
    // const { data } = this.props;
    // const { title } = this.state;
    return (
      <div>
        <p className={styles.pp}>title</p>
        <Button type="primary" onClick={this.btn.bind(this)}>ss</Button>
        <hr />
        <Father />
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log('state==', state);
  return { data: state };
}

// function mapDispatchToProps(dispatch) {
//   // console.log('test---', dispatch);
//   // // return dispatch({test});
//   return {
//     dispatch: (dispatch) => dispatch(),
//   };
// }

const mapDispatchToProps = ({
  getData,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
