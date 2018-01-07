import React from 'react';
import { connect } from 'react-redux';
import { Spin } from 'antd';

// 基础组件作为高阶组件的参数传入
function Loading(Container) {
  // 创建一个中间组件，该中间组件会在添加了逻辑之后返回
  class Load extends React.Component {
    render() {
      return (
        <Spin spinning={this.props.fetching}>
          <Container />
        </Spin>
      );
    }
  };
  function mapStateToProps(state) {
    return {
      fetching: state.examdata.fetching,
    };
  }

  return connect(
    mapStateToProps,
  )(Load);
}

export default Loading;
