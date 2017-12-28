import React, { Component } from 'react';
// import Gome from '../../components/gome';
import { Spin } from 'antd';

// import request from 'superagent';

const request = require('superagent');

function loadingDecorator(target, key, descriptor) {
  // console.log('h', target, 'a', key, 'v', descriptor);
  const method = descriptor.value;
  descriptor.value = async function (...args) {

    this.setState({ loading: true });

    const ret = await method.apply(this, args);

    this.setState({ loading: false });
    return ret;
  };
  return descriptor;
}
// function loadingDecorator(target, name, descriptor) {
//   const run = descriptor.value;
//   descriptor.value = async function () {
//     // this.setState({ loading: true });
//     console.log('i been losing sleep');
//     const res = await run.apply(this, arguments);
//     console.log('this.state.loading');
//     // this.setState({ loading: false });
//     return res;
//   };
//   return descriptor;
// }

class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'one',
      loading: false,
      data: [],
    };
  }

  // @loadingDecorator
  componentWillMount() {
    // request.get('http://120.77.33.107:8000/web/get_datas/').then((res) => {
    //   this.setState({ data: res.body });
    // });
    console.log('will mount');
  }

  componentDidMount() {
    request.get('http://120.77.33.107:8000/web/get_datas/').then((res) => {
      this.setState({ data: res.body });
    });
    // console.log(data);
    console.log('did mount');
  }

  componentWillUpdate() {
    console.log('will update');
  }
  componentDidUpdate() {
    console.log('did update');
  }


  render() {
    console.log('render');
    return (
      <Spin spinning={this.state.loading}>
        {this.state.data.map((item, i) => <p key={i}>{item.content}</p>)}
        {/* <Gome /> */}
      </Spin>
    );
  }
}

export default Test;
