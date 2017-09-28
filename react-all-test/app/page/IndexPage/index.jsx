import React, { Component } from 'react';
// import { dispatch } from 'redux';
import { connect } from 'react-redux';

import { Button } from 'antd';

import { getData } from 'actions/testAction';
import styles from './index.less';

class IndexPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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
  btn = () => {
    // this.props.dispatch(getData());
    this.props.getData();
    console.log(this.props);
  }

  render() {
    console.log('login render', this.props);
    return (
      <div>
        <p className={styles.pp}>title</p>
        <Button type="primary" onClick={this.btn}>ss</Button>
        <hr />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log('state==', state);
  return { data: state };
};

const mapDispatchToProps = ({
  getData,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(IndexPage);
