import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Steps, Button, Table } from 'antd';

import styles from './common.less';
import { ID } from '../lib/const';
import { modifyId, fetchUniversity } from '../actions/examaction';
import DeleteItem from './common/delete-item';
import AddItem from './common/add-item';
import ModifyItem from './common/modify-item';

const Step = Steps.Step;

class University extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentWillMount() {
    const { provinceId } = this.props.examdata;
    this.props.fetchUniversity(provinceId);
  }
  async add(name) {
    // await this.props.addProvince(name, 1);
    // this.props.fetchProvince();
  }
  async modify(record, name) {
    // await this.props.modifyProvince(record.id, name, 1);
    // this.props.fetchProvince();
  }
  async del(record) {
    // await this.props.deleteProvince(record.id);
    // this.props.fetchProvince();
  }
  next(record) {
    this.props.modifyId(ID.UNIVERSITY, record.id);
    this.props.next();
  }
  render() {
    const columns = [{
      title: '学校',
      dataIndex: 'name',
    }, {
      title: '学校id',
      dataIndex: 'id',
    }, {
      title: '操作',
      dataIndex: 'action',
      render: (text, record) => {
        return (
          <span>
            <ModifyItem record={record} title={'学校名称'} onModify={this.modify.bind(this, record)} />
            <span className="ant-divider" />
            <DeleteItem record={record} title={'学校：'} onDel={this.del.bind(this, record)} />
            <span className="ant-divider" />
            <a href="#" className="ant-dropdown-link" onClick={this.next.bind(this, record)}>查看学校下的学院</a>
          </span>
        );
      },
    }];
    const { university } = this.props.examdata;
    let dataSource = [];
    if (university.length !== 0) {
      dataSource = university.map((item, i) => {
        return { ...item, key: i, name: item.university_name, id: item.university_id }
      });
    }

    return (
      <div className={styles.container}>
        <div className={styles['top-content']}>
          <AddItem btnName={'添加学校'} title={'学校'} onAdd={this.add.bind(this)} />
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

const mapDispatchToProps = ({ modifyId, fetchUniversity });

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(University);
