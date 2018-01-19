import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Input, Button } from 'antd';
import styles from './index.less';

export default class Confirm extends Component {

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
    };
  }
  onInpChange(e) {
    this.setState({ name: e.target.value });
  }
  showModal() {
    this.setState({
      visible: true,
    });
  }
  handleOk() {
    const { name } = this.state;
    this.props.onAdd(name);
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
    return (
      <div className={styles.modalComponent}>
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
            <span>{title}名称:&nbsp;</span>
            <Input onBlur={this.onInpChange.bind(this)} style={{ width: '80%' }} />
          </div>
        </Modal>
      </div>
    );
  }
}

