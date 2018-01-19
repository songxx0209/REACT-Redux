import React from 'react';
import { connect } from 'react-redux';
import { Tabs, Button, Table, Modal, Input, notification, Menu, Dropdown } from 'antd';
import { delZuoPinItem, setOptionId, addOrEdit, zuoPinModalShow, editIndex, editIndexSave, editIndexCancel } from '../actions/zuoPinActions';
import EditableCell from '../components/EditableCell';

@connect((store) => {
  return {
    tabkey: store.zuoPinStore.tabkey,
    activeId: store.zuoPinStore.activeId,
    cacheValue: store.zuoPinStore.cacheValue,
  };
})

export default class ZuoPinTable extends React.Component {
  constructor() {
    super();
    this.state = {
      sortedInfo: null,
    }
  }
  handleChange(pagination, filters, sorter) {
    this.setState({
      sortedInfo: sorter,
    })
  }
  previewItem(tabkey, record) {
    let link = '';
    let title = '';
    if (tabkey === '2') {
      link = <div dangerouslySetInnerHTML={{ __html: record.link }}></div>;
      title = '视频';
    } else if (tabkey === '1') {
      link = <div dangerouslySetInnerHTML={{ __html: record.content }}></div>;
      title = '正文';
    } else if (tabkey === '3') {
      link = <div dangerouslySetInnerHTML={{ __html: record.link }}></div>;
      // link = <audio src={record.link} controls="controls" style={{ width: '100%' }} ></audio>;
      title = '音频';
    }
    const columns = [
      {
        title: '名称',
        width: 100,
        dataIndex: 'title',
      }, {
        title: '内容',
        dataIndex: 'text',
      },
    ];

    const data = [
      {
        title: '标题',
        text: record.title,
      },
      {
        title: '来源',
        text: record.sourceName,
      },
      {
        title: '作者',
        text: record.author,
      },
      {
        title: '团队介绍',
        text: record.description,
      },
      {
        title: '票数',
        text: record.voteCount,
      },
      {
        title: '图片',
        text: <img src={record.img} style={{ maxWidth: '700px', display: 'block', margin: '0 auto' }} />,
      },
      {
        title,
        text: link,
      },
    ]

    Modal.info({
      okText: '关闭',
      title: '作品详情预览',
      width: 1000,
      content: (<div id="detailModal"><Table columns={columns} dataSource={data} pagination={false} bordered size="middle" /></div>),
      onOk() {},
    });
  }

  uploadItem(record) {
    this.props.dispatch(setOptionId(record.optionId));
    this.props.dispatch(addOrEdit('edit'));
    const data = {
      source: {
        value: record.source,
      },
      title: {
        value: record.title,
      },
      author: {
        value: record.author,
      },
      description: {
        value: record.description,
      },
      img: {
        value: record.img,
      },
      link: {
        value: record.link,
      },
      content: record.content,
    }
    this.props.dispatch(zuoPinModalShow(data));
  }
  deleteItem(record) {
    this.props.dispatch(delZuoPinItem(record, this.props.data));
  }
  edit(record) {
    this.props.dispatch(editIndex({ contentType: record.contentType, optionId: record.optionId, isEdit: true, cacheValue: record.orderId }));
  }
  openNotification(type, description) {
    notification[type]({
      message: '通知提醒框',
      description,
      duration: 3,
    })
  }
  editDone(record, flag) {
    if (flag === 'save') {
      if (this.props.data.length >= this.props.cacheValue && this.props.cacheValue != record.orderId) {
        this.props.dispatch(editIndexSave(this.props.data, record.optionId, record.orderId, this.props.cacheValue, record.contentType));
      } else if (this.props.cacheValue == record.orderId) {
        this.openNotification('warn', '想修改的序号与原始序号一样,无法修改');
      } else {
        this.openNotification('error', `序号不能超过作品总数: ${this.props.data.length}`);
      }
    } else {
      this.props.dispatch(editIndexCancel());
    }
  }
  render() {
    const { data, tabkey } = this.props;
    let { sortedInfo } = this.state;
    sortedInfo = sortedInfo || {};
    const columns = [{
      title: '作品编号',
      dataIndex: 'orderId',
      key: 'orderId',
      width: 100,
      sorter: (a, b) => a.orderId - b.orderId,
      sortOrder: sortedInfo.columnKey === 'orderId' && sortedInfo.order,
      render: (text, record, index) => {
        const { orderId, editable } = record;
        return <EditableCell value={orderId} editable={editable} />
      },
    }, {
      title: '作品标题',
      dataIndex: 'title',
    }, {
      title: '来源',
      dataIndex: 'sourceName',
    }, {
      title: '作者',
      dataIndex: 'author',
    }, {
      title: '票数',
      dataIndex: 'voteCount',
      key: 'voteCount',
      sorter: (a, b) => a.voteCount - b.voteCount,
      sortOrder: sortedInfo.columnKey === 'voteCount' && sortedInfo.order,
    }, {
      title: '功能',
      render: (text, record, index) => {
        const { editable } = record;
        const editBtn = editable ?
          <span>
            <a onClick={this.editDone.bind(this, record, 'save')}>保存</a>
            <a onClick={this.editDone.bind(this, record, 'cancel')}> 取消</a>
          </span>
            :
          <span>
            <a onClick={this.edit.bind(this, record)}>修改编号 </a>
          </span>;
        return (
            <span>
            { editBtn }
            <span className="ant-divider" />
            <a onClick={this.previewItem.bind(this, tabkey, record)}>详情</a>
            <span className="ant-divider" />
            <a onClick={this.uploadItem.bind(this, record)}>编辑</a>
            <span className="ant-divider" />
            <a onClick={this.deleteItem.bind(this, record)}>删除</a>
          </span>
        )
      },
    }];
    return (
      <div style={{ minHeight: '700px' }}>
        <Table columns={columns} dataSource={data} onChange={this.handleChange.bind(this)} rowKey={'orderId'} pagination={{ pageSize: 12 }} />
      </div>
    )
  }
}
