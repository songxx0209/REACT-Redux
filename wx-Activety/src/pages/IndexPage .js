import React from 'react';
import { Link } from 'react-router';
import { Row, Col, Button, Spin, Tabs, Pagination, Modal } from 'antd';
import { connect } from 'react-redux';
import SearchBar from '../components/SearchBar.jsx'
import { DataTable } from '../components/DateTable.jsx'
const TabPane = Tabs.TabPane;

@connect((store) => {
  return {
    voteData: store.voteData,
  };
})
export default class IndexPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { visible: false, };
  }

  showModal() {
    this.setState({
      visible: true,
    });
  }

  handleOk() {
    this.setState({
      visible: false,
    });
  }

  render() {
    const { zuoPinList } = this.props.voteData;
    const btn = {
      lineHeight: '30px',
      fontSize: '1rem',
      fontFamily: '微软雅黑',
    }
    let datas = null;
    if(zuoPinList){
      const list = zuoPinList.data;
      let data1 = list.filter(function (item, index){
        return item.contentType == 1;
      });
      let data2 = list.filter(function (item, index){
        return item.contentType == 2;
      });
      let data3 = list.filter(function (item, index){
        return item.contentType == 3;
      });

      datas = <div>
        <Row>
          <Col span={18}> <SearchBar dispatch={this.props.dispatch} /> </Col>
          <Col offset={1} span={4}> <span style={btn} onClick={this.showModal.bind(this)} type="ghost" >活动规则</span> </Col>
          <Modal title="活动规则：" footer={''} visible={this.state.visible}
            onCancel={this.handleOk.bind(this)}
          >
            <p>{this.props.voteData.activeData.rule}</p>
          </Modal>
        </Row>
        <Tabs className="hsTab" defaultActiveKey="1">
          <TabPane tab="影评" key="1">
            <DataTable dataArr={data1}  pageSize={6} filter={this.props.voteData.filter} dispatch={this.props.dispatch} />
          </TabPane>
          <TabPane tab="视频" key="2">
            <DataTable dataArr={data2}  pageSize={6} filter={this.props.voteData.filter} dispatch={this.props.dispatch} />
          </TabPane>
          <TabPane tab="音评" key="3">
            <DataTable dataArr={data3}  pageSize={6} filter={this.props.voteData.filter} dispatch={this.props.dispatch} />
          </TabPane>
        </Tabs>
      </div>
    }
    return (
      <Spin size="large" spinning={this.props.voteData.fetching}>
        <div style={{ width: '100%', height: '300px'}} >
          {datas}
        </div>
      </Spin>
    )
  }
}