import React from 'react';
import { Row, Col, Collapse } from 'antd';
import { fetchThemeType } from '../actions/themeActions';
import ThemeFilter from '../components/ThemeFilter';
import FilterTree from '../components/FilterTree';

const Panel = Collapse.Panel;

export default class FilterSection extends React.Component {

  componentWillMount() {
    this.props.dispatch(fetchThemeType(this.props.videoTypeId));
  }

  render() {
    const { themeTypeList } = this.props;

    return (
      <Collapse bordered={false} >
          <Panel header="筛选" key="1">
           <Row type="flex" justify="space-around" align="top" >
            <Col xs={24}sm={16} md={16} lg={16}>
              <FilterTree dispatch={this.props.dispatch.bind(this)} themeTypeList={themeTypeList} />
              </Col>
            <Col xs={24} sm={8} md={8} lg={8}>
              <ThemeFilter dispatch={this.props.dispatch.bind(this)} />
            </Col>
          </Row>
          </Panel>

      </Collapse>

    );
  }
}
// defaultActiveKey={['1']}
//  <div style={{ padding: '0px 0 10px', borderBottom: '1px solid #ecf0f1' }}>

//       </div>
