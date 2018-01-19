import React from 'react';
import { connect } from 'react-redux';
import { Tabs, Button, Table, Spin } from 'antd';
import { modalShow, modalInit } from '../actions/modalAction';
import { deleteZuopingItem } from '../actions/zuoPingActions';

@connect((store) => {
  return {
    delLoading: store.voteData.delLoading,
    tabkey: store.modalData.tabkey,
  };
})

export default class DetailCard extends React.Component {
  constructor() {
    super();
    this.state = {
      sortedInfo: null,
    }
  }

  handleChange(pagination, filters, sorter) {
    this.setState({
      sortedInfo: sorter,
    });
  }
  clearAll(e) {
    e.preventDefault();
    this.setState({
      sortedInfo: null,
    });
  }
  setAgeSort(e) {
    e.preventDefault();
    this.setState({
      sortedInfo: {
        order: 'descend',
        columnKey: 'voteCount',
      },
    });
  }
  previewItem(record) {
    console.log(record);
  }
  uploadItem(record) {
    this.props.dispatch(modalInit({ videoSource: 'usa', videoTitle: 'hello world', videoAuthor: 'abcdef', videoDes: '123', videoImage: 'http://img5.mtime.cn/mg/2016/11/07/120123.48767203_270X405X4.jpg', mediaSrc: 'http://player.youku.com/embed/XMTgzMjE3NjM0OA==', content: '<p>this is editor test.</p>' }));
    this.props.dispatch(modalShow(true));
  }
  deleteItem(tabkey, record) {
    this.props.dispatch(deleteZuopingItem(tabkey, record.key));
  }
  render() {
    const { data, resourse, tabkey } = this.props;
    let { sortedInfo } = this.state;
    sortedInfo = sortedInfo || {};

    const columns = [{
      title: '标号',
      dataIndex: 'number',
      key: 'number',
    }, {
      title: '标题',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '来源',
      dataIndex: 'resourse',
      key: 'resourse',
    }, {
      title: '票数',
      dataIndex: 'voteCount',
      key: 'voteCount',
      sorter: (a, b) => a.voteCount - b.voteCount,
      sortOrder: sortedInfo.columnKey === 'voteCount' && sortedInfo.order,
    }, {
      title: '功能',
      key: '',
      render: (text, record) => (
        <span>
          <a onClick={this.previewItem.bind(this, record)}>查看</a>
          <span className="ant-divider" />
          <a onClick={this.uploadItem.bind(this, record)}>编辑</a>
          <span className="ant-divider" />
          <a loading={this.state.delLoading} onClick={this.deleteItem.bind(this, tabkey, record)}>删除</a>
        </span>
      )
    }];

    let roots = null;
    roots = data.map((ele, index) => {
      return {
        key: index + 1,
        number: ele.exhibitId,
        name: ele.exhibitName,
        resourse: resourse,
        voteCount: ele.voteCount,
      }
    })
    return (
      <div>
        <Spin size="large" spinning={this.props.delLoading} tip="Loading...">
          <Table columns={columns} dataSource={roots} onChange={this.handleChange.bind(this)} />
        </Spin>
      </div>
    )
  }
}
