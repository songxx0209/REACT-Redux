import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { Test } from '../components/test.jsx'

@connect((store) => {
  return {
    voteData: store.voteData,
  };
})
export default class DetailPage extends React.Component {
	render() {
		const { exhibitId,type } = this.props.params;
		const objs = this.props.voteData['type' + type];

		if(objs){
			const itemDate = objs.filter(obj => obj.exhibitId == exhibitId ? true : false )
			if(type == '1'){
				return <Test data={itemDate[0]} type={type} exhibitId={exhibitId} dispatch={this.props.dispatch}/>
			}else if(type === '2'){
				return <Test data={itemDate[0]} type={type} exhibitId={exhibitId} dispatch={this.props.dispatch} />
			}else if(type === '3'){
				return <Test data={itemDate[0]} type={type} exhibitId={exhibitId} dispatch={this.props.dispatch} />
			}
		}else{
			return <div>加载中....</div>;
		}	
	}
}
