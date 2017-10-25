// src/Addsss.jsx
import React from 'react';

// 基础组件作为高阶组件的参数传入
function Addsss(Container) {
  // 创建一个中间组件，该中间组件会在添加了逻辑之后返回
  return class Asss extends React.Component {
    componentDidMount() {
      console.log('我是高阶组件');
    }
    render() {
      return (
        // 高阶组件往基础组件中传入了一个name属性，这是高阶组件赋予基础组件的新能力，当然，根据实际需求还可以添加更为复杂的新能力
        <Container name="asper">{ this.props.children }</Container>
      );
    }
  };
}

export default Addsss;
