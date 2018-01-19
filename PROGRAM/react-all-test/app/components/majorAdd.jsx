import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Input, Button } from 'antd';
// import styles from './index.less';

export default class MajorAdd extends Component {

  static propTypes = {
    title: PropTypes.string,
  }

  static defaultProps = {
    title: '添加',
  }

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      name: '',
      enroll: 0,
      recommend: 0,
      majorcode: ''
    };
  }
  onInpChange(e) {
    this.setState({ name: e.target.value });
  }
  enroll(e) {
    this.setState({ enroll: e.target.value });
  }
  recommend(e) {
    this.setState({ recommend: e.target.value });
  }
  majorcode(e) {
    this.setState({ majorcode: e.target.value });
  }
  showModal() {
    this.setState({
      visible: true,
    });
  }
  handleOk() {
    const { name, enroll, recommend, majorcode } = this.state;
    this.props.onAdd(name, enroll, recommend, majorcode);
    this.setState({
      visible: false,
    });
  }
  handleCancel() {
    this.setState({
      visible: false,
    });
  }
  render() {
    const { title } = this.props;
    const item = {
      marginBottom: 10, 
    }
    return (
      <div >
        <Button type="primary" onClick={this.showModal.bind(this)}>{`添加${title}`}</Button>
        <Modal
          title={`添加${title}`}
          okText="添加"
          cancelText="取消"
          visible={this.state.visible}
          onCancel={this.handleCancel.bind(this)}
          onOk={this.handleOk.bind(this)}
        >
          <div>
            <div style={item}>
              <span>{title}名称:&nbsp;</span>
              <Input onBlur={this.onInpChange.bind(this)} style={{ width: '80%' }} />
            </div>

            <div style={item}>
              <span>{title}招生人数:&nbsp;</span>
              <Input onBlur={this.enroll.bind(this)} style={{ width: '80%' }} />
            </div>

            <div style={item}>
              <span>{title}推免人数:&nbsp;</span>
              <Input onBlur={this.recommend.bind(this)} style={{ width: '80%' }} />
            </div>

            <div style={item}>
              <span>{title}专业代码:&nbsp;</span>
              <Input onBlur={this.majorcode.bind(this)} style={{ width: '80%' }} />
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

