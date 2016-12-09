import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { Input, Button, Spin, Alert } from 'antd';
import ActiveTable from './activeTable';
import FirstTableModal from './FirstTableModal';
import { searchFilter, getActiveList, activeModalShow, clearFrom } from '../actions/activeActions';

@connect((store) => {
  return {
    listData: store.listData,
  };
})

export default class DetailPage extends React.Component {

    componentWillMount() {
        this.props.dispatch(getActiveList());//获取活动列表
    }

    addBtn() {
        this.props.dispatch(clearFrom());
        this.props.dispatch(activeModalShow(true));
    }

    searchs(e) {
        const selectWord = e.target.value;
        this.props.dispatch(searchFilter(selectWord));
    }
    render() {
        const start_end = {
        	width:'96%',
        	margin:'20px auto',
        }
        const inpt = {
            width:'20%',
            display:'inline-block',
            float:'right'
        }
        return (       	
            <Spin size="large" tip="Loading..." spinning={this.props.listData.fetching}>
             	<div style = {start_end}>
			    	<div style={{margin:'10px 0'}}>
				    	<Button type="primary" onClick={this.addBtn.bind(this)}>添加活动</Button>
                        <Input placeholder="输入检索关键词" style={ inpt } onChange={ this.searchs.bind(this) } />
			    	</div>
			    	<div><ActiveTable listData={this.props.listData} dispatch={this.props.dispatch} /></div>
			    </div>
                <FirstTableModal listData={this.props.listData} dispatch={this.props.dispatch} />
            </Spin>
        );
    }
}
