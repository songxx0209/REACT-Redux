import React from 'react';
import { Checkbox } from 'antd';

export default class SelectFilter extends React.Component {

  onChange(e) {
    console.log(e.target.checked, this.props.word);
  }

  render() {
    return (
      <Checkbox onChange={this.onChange.bind(this)}>{this.props.word}</Checkbox>
    )
  }
}
