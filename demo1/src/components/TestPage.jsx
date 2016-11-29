import React from 'react';
import { connect } from 'react-redux';
import { Tabs, Button, Table, Row, Col } from 'antd';
const TabPane = Tabs.TabPane;
import DetailCard from './DetailCard';
import UploadModal from './UploadModal';
import { modalShow, modalInit, getSource, setTabKey } from '../actions/modalAction';

@connect((store) => {
  return {
    content: store.voteData.content,
    initData: store.modalData.initData,
    tabkey: store.modalData.tabkey,
  };
})

export default class TestPage extends React.Component {
	componentWillMount() {
		this.props.dispatch(getSource());
	}

	showModal() {
		this.props.dispatch(modalShow(true));
		this.props.dispatch(modalInit({ videoSource: '', videoTitle: '', videoAuthor: '', videoDes: '', videoImage: '', content: '<p></p>', mediaSrc: '' }));
	}
	onTabsChange(key) {
		this.props.dispatch(setTabKey(key));
	}
	render() {
		const { content, params } = this.props;
		let arr = null;
		if(content){
			arr = content[parseInt(params.key)-1];
			return (
				<Row>
					<Col span={24}>
						<Button type="primary" style={{ marginTop: '10px' }} onClick={this.showModal.bind(this)}>添加</Button>
						<Tabs defaultActiveKey="1" onChange={this.onTabsChange.bind(this)}>
							<TabPane tab="视频" key="1" >
								<DetailCard data={arr.data.type1} resourse={arr.title} dispatch={this.props.dispatch} />
							</TabPane>
							<TabPane tab="影评" key="2">
								<DetailCard data={arr.data.type2} resourse={arr.title} dispatch={this.props.dispatch} />
							</TabPane>
							<TabPane tab="音评" key="3">
								<DetailCard data={arr.data.type3} resourse={arr.title} dispatch={this.props.dispatch} />
							</TabPane>
						</Tabs>
						<UploadModal tabkey={this.props.tabkey} modalInit={this.props.initData} />
					</Col>
				</Row>
			);
		} else {
			return <div></div>
		}
	}
}
