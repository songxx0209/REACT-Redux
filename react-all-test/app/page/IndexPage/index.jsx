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
    
  }
  componentDidMount() {
    // console.log('did mount');
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
    const { data } = this.props;
    let list = this.props.data.get('list');
    console.log('will mount', list);
    return (
      <div>
        <div>
          <img src="http://120.77.33.107/images/home-bg.jpg" alt=""/>
        </div>
        <Button type="primary" onClick={this.btn}>ss</Button>
        <hr />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log('state==', state);
  return { data: state.articleList };
};

const mapDispatchToProps = ({
  getData,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(IndexPage);
