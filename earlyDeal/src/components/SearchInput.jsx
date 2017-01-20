import React from 'react';
import classNames from 'classnames';
import { Button, Input, notification } from 'antd';
import { fetchTable, fetchStarTable } from '../actions/tableActions';


const InputGroup = Input.Group;

export default class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      value: '',
      focus: false,
    };
  }

  handleInputChange(e) {
    const filterWord = e.target.value;
    this.setState({
      value: e.target.value,
    });
  }

  handleFocusBlur(e) {
    this.setState({
      focus: e.target === document.activeElement,
    });
  }

  handleSearch(e) {
    const searchKey = this.state.value;
    const selectedId = this.props.selected;
    if (ENV.searchNull) {
      if (selectedId === 'star') {
        this.props.dispatch(fetchStarTable(searchKey));
      } else {
        this.props.dispatch(fetchTable(selectedId, searchKey));
      }
    } else if (selectedId && searchKey) {
        if (selectedId === 'star') {
          this.props.dispatch(fetchStarTable(searchKey));
        } else {
          this.props.dispatch(fetchTable(selectedId, searchKey));
        }
      } else if (selectedId === null) {
        this.openNotification('error', '请先选择搜索分类！');
      } else if (searchKey === '') {
        this.openNotification('error', '请输入搜索词！');
      }
  }

  openNotification(type, description) {
    notification[type]({
      message: '通知提醒框',
      description,
      duration: 2.5,
    });
  }

  render() {
    const btnCls = classNames({
      'ant-search-btn': true,
      'ant-search-btn-noempty': !!this.state.value.trim(),
    });
    const searchCls = classNames({
      'ant-search-input': true,
      'ant-search-input-focus': this.state.focus,
    });
    return (
      <div className="ant-search-input-wrapper">
        <InputGroup className={searchCls}>
          <Input size="large" placeholder="请输入要搜索的电影名称" onChange={this.handleInputChange.bind(this)} onPressEnter={this.handleSearch.bind(this)} onFocus={this.handleFocusBlur.bind(this)} onBlur={this.handleFocusBlur.bind(this)} />
          <div className="ant-input-group-wrap">
            <Button icon="search" size="large" className={btnCls} onClick={this.handleSearch.bind(this)} />
          </div>
        </InputGroup>
      </div>
    );
  }
}
