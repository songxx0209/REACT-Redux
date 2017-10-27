
import React, { Component } from 'react';
import Addsss from './Addsss';

class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  // componentWillMount() {
  //   console.log('will mount');
  // }

  componentDidMount() {
    console.log(this.props.name);
  }

  render() {
    return (
      <div className={this.props.name}>{ this.props.children }</div>
    );
  }
}

export default Addsss(Test);
