import React from 'react';
import { Row, Col } from 'antd';
import { Link } from 'react-router';

export default class ThemeDetail extends React.Component {
  getGoodDescription(summary) {
    const _summary = JSON.parse(summary);
    // console.log(_summary, summary);
    return (
     <Row>
        <Col xs={24} sm={18} md={20} lg={20}>
          <span style={{ color: '#eb6864' }}>价格: {_summary.price} </span>
        </Col>
        <Col xs={24} sm={4} md={4} lg={4}>
          <span>已售: {_summary.count}</span>
        </Col>
     </Row>
    );
  }

  render() {
    const { id, imgUrl, title, score, issueTime, summary, source, themeTypeId, themeTypeName, videoTypeId } = this.props.data;
    const { videoSetId } = this.props;
    const videoId = this.props.videoId;
    const zhihuImg = imgUrl || 'http://resource.handsight.cn/TVHelp01/img/upload/1480902153810_4513.png';
    let titleLink = '';
    let description = '';
    if (themeTypeId === 3) {
      titleLink = <a href={source} target="_blank" style={{ color: '#5bc0de' }}> {title} </a>;
      description = this.getGoodDescription(summary);
    } else {
      const url = 'videopage/' + videoTypeId + '/' + videoId + '/' + videoSetId + '/' + id;
      titleLink = <Link to={url} style={{ color: '#5bc0de' }} >{title}</Link>;
      description = summary;
    }


    return (
      <Row type="flex" style={{ padding: '20px 0', borderBottom: '1px solid #ecf0f1' }}>
        <Col xs={0} sm={8} md={6} lg={6}>
          <img src={zhihuImg} style={{ maxWidth: '230px', height: '140px', boxShadow: '0 0 10px #999' }} className="img-thumbnail" />
        </Col>
        <Col xs={24} sm={16} md={18} lg={18}>
        <Row>
           <Col xs={21} sm={21} md={21} lg={21}>
          <h3 style={{ marginTop: '5px', fontSize: '23px' }}>{titleLink}</h3> </Col>
          <Col xs={3} sm={3} md={3} lg={3}> <span style={{ color: '#5bc0de' }}>分数:{score}</span> </Col>
        </Row>

          <div style={{ height: '65px', overflow: 'hidden' }}>{description}</div>
          <span style={{ paddingRight: '30px' }}>{issueTime}</span><span style={{ color: '#5bc0de' }}>{themeTypeName}</span>
        </Col>
      </Row>
    );
  }
}
