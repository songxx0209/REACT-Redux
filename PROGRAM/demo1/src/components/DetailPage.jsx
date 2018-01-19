import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { Input, Button } from 'antd';

import ActiveTable from './activeTable';
import FirstTableModal from './FirstTableModal';
import { searchFilter } from '../actions/voteActions';
import { firstModalShow, firstTableFrom, clearAll } from '../actions/modalAction';

@connect((store) => {
  return {
    voteData: store.voteData,
    modalData: store.modalData,
  };
})

export default class DetailPage extends React.Component {

    IsModal() {
        this.props.dispatch(clearAll());
        this.props.dispatch(firstModalShow(true));
    }

    searchs(e) {
        const selectWord = e.target.value;
        this.props.dispatch(searchFilter(selectWord));
    }
    render() {
    	console.log('+++++++=', this.props.voteData);
        const start_end = {
        	width:'96%',
        	margin:'10px auto',
        }
        const btn = {
        	marginLeft:'5px'
        }
        const inpt = {
            width:'20%',
            display:'inline-block'
        }
        return (
        	<div>
             	<div style = {start_end}>
			    	<div style={{margin:'10px 0'}}>
			    		<Input placeholder="输入检索关键词" style={ inpt } onChange={ this.searchs.bind(this) } />
				    	<Button type="primary" style={btn}>搜索</Button>
				    	<Button type="primary" style={btn} onClick={this.IsModal.bind(this)}>添加活动</Button>
			    	</div>
			    	<div><ActiveTable /></div>
			  </div>
              <FirstTableModal IsModal={this.props.modalData} dispatch={this.props.dispatch} />
            </div>
        );
    }
}
