import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { DatePicker, Input, Button, Table, Icon, Modal } from 'antd';
const RangePicker = DatePicker.RangePicker;
import { shanChu } from '../actions/voteActions.js'
import { firstModalShow, firstTableFrom } from '../actions/modalAction';

@connect((store) => {
  return {
    content: store.voteData.content,
    voteData: store.voteData,
    modalData: store.modalData.firstShow,
  };
})

export default class AactiveTable extends React.Component {

    deleteActive(record) {
        const activeId = record.activeId;
        this.props.dispatch(shanChu(activeId));
    }

    IsModal(record) {
        this.props.dispatch(firstModalShow(true));
        this.props.dispatch(firstTableFrom(record.titles, record.startTime, record.endTime, record.active));
    }

    render(){
    	const { content, voteData } = this.props;
    	console.log('content==', this.props)
    	let arr = null;
    	

    	let roots = null;
		if(content){
			if(voteData.filter){
	    		arr = content.filter(function (item, index){
	    			if(item.title.toLowerCase().indexOf(voteData.filter.toLowerCase()) !== -1){
	    				return item;
	    			}
	    		});
	    		roots = arr.map(function(a,b,c){
					return {
						key: b+1,
					  	titles: a.title,
					  	startTime: a.startTime,
					  	endTime: a.endTime,
					  	active:a.state,
					  	activeId:a.activeId,
					}
				})
	    	}else {
	    		roots = content.map(function(a,b,c){
					return {
						key: b+1,
					  	titles: a.title,
					  	startTime: a.startTime,
					  	endTime: a.endTime,
					  	active:a.state,
					  	activeId:a.activeId,
					}
				})
	    	}
		}
    	const columns = [{
		  	title: '标题',
		  	dataIndex: 'titles',
		  	key: 'name',
		  	render: text => <a href="#">{text}</a>,
		}, {
		  	title: '开始时间',
		  	dataIndex: 'startTime',
		  	key: 'age',
		}, {
		  	title: '结束时间',
		  	dataIndex: 'endTime',
		  	key: 'address',
		}, {
		  	title: '活动状态',
		  	dataIndex: 'active',
		  	key: 'action',
		}, {
		  	title: '功能',
		  	key: 'gongneng',
		  	render: (text, record) => (
			    <span>
			    	<a onClick={this.IsModal.bind(this, record)}>编辑</a>
          			<span className="ant-divider" />
          			<a onClick={this.deleteActive.bind(this,record)}>删除</a>
          			<span className="ant-divider" />
          			
          				<Link to={'testPage' + '/' + record.key}>
                            作品管理
                        </Link>
          			
          			<span className="ant-divider" />
          			<a>下架</a>
			      	
			    </span>
		  	)
		}];
		return <Table columns={columns} dataSource={roots} />;
    }
}

/*<Button style={btn} onClick={this.IsModal.bind(this, record)}>编辑</Button>
<Button style={btn} onClick={this.deleteActive.bind(this,record)}>删除</Button>
<Button style={btn}>
    <Link to={'testPage' + '/' + record.key}>
        作品管理
    </Link>
</Button>
<Button style={btn}>下架</Button>*/