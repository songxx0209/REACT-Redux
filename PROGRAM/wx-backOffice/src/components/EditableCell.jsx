import React from 'react';
import { connect } from 'react-redux';
import { Table, Input, Popconfirm } from 'antd';
import { setCacheValue } from '../actions/zuoPinActions';

@connect((store) => {
  return {
    cacheValue: store.zuoPinStore.cacheValue,
  };
})

export default class EditableCell extends React.Component {
  handleChange(e) {
    const value = e.target.value;
    this.props.dispatch(setCacheValue(value));
  }

  render() {
    const { value, editable } = this.props;
    return (
      <div>
      {
        editable ?
        <div>
          <Input
            value={this.props.cacheValue}
            onChange={this.handleChange.bind(this)}
            style= {{ textAlign: 'center' }}
          />
        </div>
        :
        <div className="editable-row-text">
          {value || ' '}
        </div>
      }
    </div>);
  }
}
