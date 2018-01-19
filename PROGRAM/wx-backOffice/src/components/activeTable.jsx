import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { DatePicker, Input, Button, Table, Icon, Modal } from 'antd';
const RangePicker = DatePicker.RangePicker;
import { deleteActivity, activeModalShow, keepData } from '../actions/activeActions.js'


export default class AactiveTable extends React.Component {

  deleteActive(record) {
    const id = record.id;
    this.props.dispatch(deleteActivity(id));
  }

  updateActive(record) {
  	console.log('record==', record);
    	  //this.props.dispatch(keepData(record.id));
    	  //this.props.dispatch(activeModalShow(true));
  }

  render() {
	  const { listData } = this.props;
	  let arr = null;
	  let roots = null;
    if (listData.list) {
      if (listData.filter) {
        arr = listData.list.filter(function (item, index) {
          if (item.title.toLowerCase().indexOf(listData.filter.toLowerCase()) !== -1) {
	          return item;
    			}
    		});
    	} else {
        arr = listData.list;
    	}
      roots = arr.map(function (item, index) {
  		let state = null;
      if (item.mark == 1) {
        state = '上架';
      } else if (item.mark == 3) {
        state = '下架';
      } else if (item.mark == 2) {
        state = '未上架';
      }
      return {
        key: index + 1,
        title: item.title,
        startTime: item.startTime,
        endTime: item.endTime,
        activeState: state,
        id: item.id,
				}
			})
		}
	  const columns = [{
      title: '标题',
      dataIndex: 'title',
      key: 'title',
      render: text => <a href="#">{text}</a>,
      }, {
        title: '开始时间',
        dataIndex: 'startTime',
        key: 'startTime',
			}, {
        title: '结束时间',
        dataIndex: 'endTime',
        key: 'endTime',
			}, {
        title: '活动状态',
        dataIndex: 'activeState',
        key: 'activeState',
			}, {
        title: '功能',
        key: 'gongneng',
        render: (text, record) => (
			    <span>
			    	<a onClick={this.updateActive.bind(this, record)}>编辑</a>
	        			<span className="ant-divider" />
	        			<a onClick={this.deleteActive.bind(this, record)}>删除</a>
	        			<span className="ant-divider" />
	    				<Link to={'zuoPinPage' + '/' + record.id}>
	                      作品管理
	                  </Link>
			    </span>
		  	)
		}];
    return <Table columns={columns} dataSource={roots} />;
  }
}
