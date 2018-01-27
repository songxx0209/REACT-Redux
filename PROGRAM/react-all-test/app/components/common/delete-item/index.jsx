import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'antd';
import styles from './index.less';

export default class Confirm extends Component {
  static propTypes = {
    title: PropTypes.string,
    btnName: PropTypes.string,
  }

  static defaultProps = {
    title: '删除',
    btnName: '删除',
  }

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }
  showModal() {
    this.setState({
      visible: true,
    });
  }
  handleOk() {
    this.props.onDel();
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
    const { title, btnName, record } = this.props;
    return (
      <div className={styles.modalComponent}>
        <a href="#" onClick={this.showModal.bind(this)}>{btnName}</a>
        <Modal
          title={title}
          okText="确定"
          cancelText="取消"
          visible={this.state.visible}
          onCancel={this.handleCancel.bind(this)}
          onOk={this.handleOk.bind(this)}
        >
          <p>确定要删除 <span style={{ color: 'red' }}>{record.name}</span> 吗？</p>
        </Modal>
      </div>
    );
  }
}

