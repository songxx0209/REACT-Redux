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

class Major extends Component {
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
      title: '操作',
      dataIndex: 'action',
      render: (text, record) => {
        return (
          <span>
            <ModifyItem record={record} title={'专业名称'} onModify={this.modify.bind(this, record)} />
            <span className="ant-divider" />
            <DeleteItem record={record} title={'专业'} onDel={this.del.bind(this, record)} />
            <span className="ant-divider" />
            <a href="#" className="ant-dropdown-link" onClick={this.next.bind(this, record)}>查看专业下的考生</a>
          </span>
        );
      },
    }];
    let dataSource = [];
    if (examdata.major.length !== 0) {
      dataSource = examdata.major.map((item, i) => {
        return { ...item, key: i, name: item.major_name, id: item.major_id }
      });
    }

    return (
      <div className={styles.container}>
        <div className={styles['top-content']}>
          <AddItem btnName={'添加专业'} title={'专业'} onAdd={this.add.bind(this)} />
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
)(Major);
