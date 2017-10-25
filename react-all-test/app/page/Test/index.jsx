import React, { Component } from 'react';
import Gome from '../../components/gome';

class Test extends Component {
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

  render() {
    return (
      <div>
        <p>hello world!</p>
        <Gome />
      </div>
    );
  }
}

export default Test;
