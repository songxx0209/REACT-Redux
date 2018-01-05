import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Steps, Button, Table } from 'antd';

import styles from './common.less';
import { ID } from '../lib/const';
import { modifyId } from '../actions/examaction';
import DeleteItem from './common/delete-item';
import AddItem from './common/add-item';
import ModifyItem from './common/modify-item';

const Step = Steps.Step;

class College extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillMount() {
    // const { provinceId } = this.props.examdata;
    // this.props.fetchUniversity(provinceId);
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
    this.props.modifyId(ID.COLLEGE, record.id);
    this.props.next();
  }

  render() {
    const { examdata } = this.props;
    const columns = [{
      title: '学院',
      dataIndex: 'name',
    }, {
      title: '学院id',
      dataIndex: 'id',
    }, {
      title: '操作',
      dataIndex: 'action',
      render: (text, record) => {
        return (
          <span>
            <ModifyItem record={record} title={'学院名称'} onModify={this.modify.bind(this, record)} />
            <span className="ant-divider" />
            <DeleteItem record={record} title={'学院'} onDel={this.del.bind(this, record)} />
            <span className="ant-divider" />
            <a href="#" className="ant-dropdown-link" onClick={this.next.bind(this, record)}>查看学校下的学院</a>
          </span>
        );
      },
    }];
    let dataSource = [];
    if (examdata.college.length !== 0) {
      dataSource = examdata.college.map((item, i) => {
        return { ...item, key: i, name: item.college_name, id: item.college_id }
      });
    }

    return (
      <div className={styles.container}>
        <div className={styles['top-content']}>
          <AddItem btnName={'添加学院'} title={'学院'} onAdd={this.add.bind(this)} />
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

const mapDispatchToProps = ({ modifyId });

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(College);
