import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Input } from 'antd';
// import styles from './index.less';

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
    const { record } = props;
    this.state = {
      visible: false,
      name: record.name,
      enroll: record.enrollment,
      recommend: record.exempt,
      majorcode: record.major_id
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
    this.props.onModify(name, enroll, recommend, majorcode);
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
    const item = {
      marginBottom: 10, 
    }
    return (
      <div>
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
            <div style={item}>
              <span>{title}名称:&nbsp;</span>
              <Input defaultValue={record.name} onBlur={this.onInpChange.bind(this)} style={{ width: '80%' }} />
            </div>

            <div style={item}>
              <span>{title}招生人数:&nbsp;</span>
              <Input defaultValue={record.enrollment} onBlur={this.enroll.bind(this)} style={{ width: '80%' }} />
            </div>

            <div style={item}>
              <span>{title}推免人数:&nbsp;</span>
              <Input defaultValue={record.exempt} onBlur={this.recommend.bind(this)} style={{ width: '80%' }} />
            </div>

            <div style={item}>
              <span>{title}专业代码:&nbsp;</span>
              <Input defaultValue={record.major_id} onBlur={this.majorcode.bind(this)} style={{ width: '80%' }} />
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

