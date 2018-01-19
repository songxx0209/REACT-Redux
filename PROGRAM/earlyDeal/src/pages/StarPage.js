import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Tabs, Spin } from 'antd';
import { getStar } from '../actions/starAction';
import Star from '../components/Star';
import StarCard from '../components/StarCard';
import ShowImg from '../components/showImg';
const TabPane = Tabs.TabPane;

@connect((store) => {
  return {
    star: store.star.data,
    fetching: store.star.fetching,
  };
})

export default class StarPage extends React.Component {
  componentWillMount() {
    const { starId } = this.props.params;
    this.props.dispatch(getStar(starId));
  }

  render() {
    const { star, fetching } = this.props;
    const columnStyle = {
      fontSize: '16px',
      marginTop: '15px',
    };
    let info = '';
    if (star) {
      const { avatar, name, birthday, relativePerson, summary, movieUnit, expressionImg, horizontalImg, verticalImg, teleplayUnit } = star;
      let birthdays = '';
      if (birthday) {
        birthdays = new Date(birthday).pattern('yyyy-MM-dd');
      } else {
        birthdays = '暂无数据';
      }

      const relativeDate = relativePerson.map((ele, i) => {
        return <Star data={ele} key={i} />;
      });
      const movieData = movieUnit.map((ele, i) => {
        return <StarCard data={ele} key={i} />;
      });
      const telePlayData = teleplayUnit.map((ele, i) => {
        return <StarCard data={ele} key={i} />;
      });
      info = (<div style={{ margin: '25px auto', width: '1100px', maxWidth: '100%', minHeight: '200px' }}>
          <Row type="flex">
            <Col xs={24} sm={8}>
              <img src={avatar} style={{ maxWidth: '270px', margin: '0 auto 20px', display: 'block', boxShadow: '0 0 10px #999' }} className="img-thumbnail" />
            </Col>
            <Col xs={24} sm={16} style={{ paddingLeft: '30px' }}>
              <h2 style={{ marginTop: '0' }}>{name}</h2>
              <div style={columnStyle}>生日：{birthdays}</div>
              <Row style={columnStyle}>
                <Col xs={24} sm={2} md={2} lg={2}>
                  关系：
                </Col>
                <Col xs={24} sm={20} md={20} lg={20}>
                  <Row>{relativeDate}</Row>
                </Col>
              </Row>
              <div className="dramaPlot">简介：{summary}</div>
            </Col >
          </Row>
          <div style={{ display: 'flex', flexDirection: 'column', marginTop: '10px' }}>
            <h4 style={{ fontWeight: 'bold' }}>图集</h4>
            <div>
              <Tabs className="hsTab" defaultActiveKey="1">
                <TabPane tab="竖图" key={1}>
                  <ShowImg data={verticalImg} />
                </TabPane>
                <TabPane tab="横图" key={2}>
                  <ShowImg data={horizontalImg} />
                </TabPane>
                <TabPane tab="表情包" key={3}>
                  <ShowImg data={expressionImg} />
                </TabPane>
              </Tabs>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', marginTop: '30px' }}>
            <h4 style={{ fontWeight: 'bold', margin: '30px 0' }}>电影作品</h4>
            <div>
              {movieData}
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', marginTop: '30px' }}>
            <h4 style={{ fontWeight: 'bold', margin: '30px 0' }}>电视剧作品</h4>
            <div>
              {telePlayData}
            </div>
          </div>

        </div>);
    } else {
      info = <div style={{ width: '100%', minHeight: '400px' }} />;
    }
    return (
      <Spin tip="loading" spinning={fetching} >{info}</Spin>
    );
  }
}
