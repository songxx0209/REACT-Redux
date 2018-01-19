import React from 'react';
import { connect } from 'react-redux';
import { Button, notification } from 'antd';
import { Link } from 'react-router';
// import Vudio from '../vudio';
import { castVote } from '../actions/voteActions.js'

export class MediaPage extends React.Component{

	openNotification(val) {
    	notification.open({
      		message: val,
      		description: '',
    	});
  	}

	castvote() {
		//console.log('音频:', this.props);
		const { activeId, optionId, orderId } = this.props.itData;
		this.props.dispatch(castVote(activeId, optionId));
	}
	render() {
		const { itData } = this.props;
		console.log('tiis.props', this.props);
		const btn1 = {
			padding: '2% 4%',fontSize: '12px',borderRadius: '4px',marginRight:'10px'
		}
		const btn2 = {
			padding: '2% 4%',fontSize: '12px',borderRadius: '4px',float:'right'
		}
		const boldBlack = {
			fontWeight:'bold',fontSize:'14px', margin:'10px 0'
		}
		const content = {
			textIndent:'25px', fontSize:'10px', fontFamily:'微软雅黑'
		}
		const videoHeight = {
			height:'200px',
		}
		
		let odiv = null;
		if(itData.contentType == 1){
			odiv = <div dangerouslySetInnerHTML={{__html: itData.content}}></div>
			return (
				<div>
					<p style={boldBlack}>{ itData.description }</p>
					<p style={boldBlack} > {itData.title} </p>
					<p style={{color:'#FFA500'}} > 编号：{ itData.orderId }号</p>
						{odiv}
					<div style={{margin:'10px'}} >
						<div>
							<Button type="primary" size="small" style={btn1} onClick={this.castvote.bind(this)}>
								投票 { itData.voteCount } 票</Button>
	          				<Link to={'/'}> 
	          					<Button type="primary" size="small" style={btn2}>查看其它作品</Button>
	          				</Link>
						</div>
						<img src="http://resource.handsight.cn/TVHelp01/img/upload/1481097397283_6187.jpg" width="100%" />
					</div>
				</div>
			)
		}else if(itData.contentType  == 2||itData.contentType == 3){
			odiv = <div style={videoHeight} dangerouslySetInnerHTML={{__html: itData.link}}></div>
			return (
				<div>
					<p style={boldBlack}>{ itData.description }</p>
						{odiv}
					<div style={{margin:'10px'}} >
						<p style={boldBlack} > {itData.title} </p>
						<p style={{color:'#FFA500'}} > 编号：{ itData.orderId }号</p>
						<p style={content}>{ itData.content }</p>
						<div>
							<Button type="primary" size="small" style={btn1} onClick={this.castvote.bind(this)}>投票 { itData.voteCount } 票</Button>
	          				<Link to={'/'}> 
	          					<Button type="primary" size="small" style={btn2}>查看其它作品</Button>
	          				</Link>
						</div>
						<img src="http://resource.handsight.cn/TVHelp01/img/upload/1481097397283_6187.jpg" width="100%" />
					</div>
				</div>
			)
		}
		
	}
}
