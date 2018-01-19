import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Input } from 'antd';
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
    this.props.onModify(name);
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
    const { title, record } = this.props;
    return (
      <div className={styles.modalComponent}>
        <a href="#" onClick={this.showModal.bind(this)}>修改</a>
        <Modal
          title={`修改${title}`}
          okText="确定"
          cancelText="取消"
          visible={this.state.visible}
          onCancel={this.handleCancel.bind(this)}
          onOk={this.handleOk.bind(this)}
        >
          <div>
            <span>{title}:&nbsp;</span>
            <Input defaultValue={record.name} onBlur={this.onInpChange.bind(this)} style={{ width: '80%' }} />
          </div>
        </Modal>
      </div>
    );
  }
}

