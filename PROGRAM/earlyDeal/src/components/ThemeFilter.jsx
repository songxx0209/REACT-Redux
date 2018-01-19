import React from 'react';
import { Button, Input, notification, Collapse } from 'antd';
import { filterTheme, checkTheme, fetchThemeType, fetchThemeAttr } from '../actions/themeActions';
import classNames from 'classnames';

const InputGroup = Input.Group;
const Panel = Collapse.Panel;


export default class ThemeFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      focus: false,
    }
  }

  handleInputChange(e) {
    const filterWord = e.target.value;
    this.setState({
      value: e.target.value,
    });
    this.props.dispatch(filterTheme(filterWord));
  }

  handleFocusBlur(e) {
    this.setState({
      focus: e.target === document.activeElement,
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
            <Input size="large" placeholder="在结果中搜索" onChange={this.handleInputChange.bind(this)} onFocus={this.handleFocusBlur.bind(this)} onBlur={this.handleFocusBlur.bind(this)} />
            <div className="ant-input-group-wrap">
              <Button icon="search" size="large" className={btnCls} />
            </div>
          </InputGroup>
        </div>
    )
  }
}

