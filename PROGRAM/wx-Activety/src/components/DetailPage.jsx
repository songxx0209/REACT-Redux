import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { MediaPage } from '../components/mediaPage.jsx'

@connect((store) => {
  return {
    voteData: store.voteData,
  };
})

export default class DetailPage extends React.Component {
	render() {
		const { optionId } = this.props.params;
		let itSelf = null;
		if(this.props.voteData.zuoPinList){
			const {zuoPinList} = this.props.voteData;
			itSelf = zuoPinList.data.filter(function (item, index){
				if(item.optionId == optionId){
					return true;
				}
			});
			return <div>
				<MediaPage itData={itSelf[0]} dispatch={this.props.dispatch} />
			</div>;	
		}else{
			return <div>
				加载中...
			</div>;
		}		
	}
}
