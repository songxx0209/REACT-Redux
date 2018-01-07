import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Steps, Button, Table } from 'antd';

import styles from './common.less';
import { ID } from '../lib/const';
import { modifyId, fetchMajor, addMajor, modifyMajor, deleteMajor } from '../actions/examaction';
import DeleteItem from './common/delete-item';
import MajorAdd from './majorAdd';
import MajorModify from './majorModify';

const Step = Steps.Step;

class Major extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillMount() {
    const { collegeId } = this.props.examdata;
    this.props.fetchMajor(collegeId);
  }
  async add(name, enroll, recommend, majorcode) {
    const { collegeId } = this.props.examdata;

    await this.props.addMajor(collegeId, majorcode, name, enroll, recommend);
    this.props.fetchMajor(collegeId);
  }

  async modify(record, name, enroll, recommend, majorcode) {
    const { collegeId } = this.props.examdata;

    await this.props.modifyMajor(collegeId, record.id, majorcode, name, enroll, recommend);
    this.props.fetchMajor(collegeId);
  }
  async del(record) {
    const { collegeId } = this.props.examdata;

    await this.props.deleteMajor(collegeId, record.id);
    this.props.fetchMajor(collegeId);
  }
  next(record) {
    this.props.modifyId(ID.MAJOR, record.id);
    this.props.next();
  }

  render() {
    const { examdata } = this.props;
    const columns = [{
      title: '专业',
      dataIndex: 'name',
    }, {
      title: '专业id',
      dataIndex: 'id',
    }, {
      title: '招生人数',
      dataIndex: 'enrollment',
    }, {
      title: '推免人数',
      dataIndex: 'exempt',
    }, {
      title: '专业代码（别名）',
      dataIndex: 'major_id',
    }, {
      title: '操作',
      dataIndex: 'action',
      render: (text, record) => {
        return (
          <span>
            <MajorModify record={record} title={'专业名称'} onModify={this.modify.bind(this, record)} />
            <span className="ant-divider" />
            <DeleteItem record={record} title={'专业'} onDel={this.del.bind(this, record)} />
            {/* <span className="ant-divider" />
            <a href="#" className="ant-dropdown-link" onClick={this.next.bind(this, record)}>查看专业下的考生</a> */}
          </span>
        );
      },
    }];
    let dataSource = [];
    if (examdata.major.length !== 0) {
      dataSource = examdata.major.map((item, i) => {
        return { ...item, key: i, name: item.major_name }
      });
    }

    return (
      <div className={styles.container}>
        <div className={styles['top-content']}>
          <MajorAdd btnName={'添加专业'} title={'专业'} onAdd={this.add.bind(this)} />
        </div>
        <Table dataSource={dataSource} columns={columns} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    examdata: state.examdata,
  };
};

const mapDispatchToProps = ({ modifyId, fetchMajor, addMajor, modifyMajor, deleteMajor });

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Major);
