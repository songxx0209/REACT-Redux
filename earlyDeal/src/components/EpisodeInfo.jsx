import React from 'react';
import { Row, Col } from 'antd';
import Actor from '../components/Actor';

export default class EpisodeInfo extends React.Component {
  render() {
    const { posterImg, videoName, issueTime, director, actors, dramaPlot, videoPlayList } = this.props.data;
    const issueTimeCut = issueTime.slice(0, 10);
    const columnStyle = {
      fontSize: '16px',
      marginTop: '15px',
    };
    const linkStyle = {
      display: 'block',
      width: '50px',
      minWidth: '50px',
      height: '22px',
      overflow: 'hidden',
      textDecoration: 'none',
      textAlign: 'center',
      border: '1px solid #d8d8d8',
      cursor: 'pointer',
      color: '#666',
      background: '#fefefe',
      borderRadius: '3px',
    };
    const actorDate = actors.map((actor, i) => {
      return <Actor data={actor} videoTypeId={2} key={i} />;
    });
    const links = videoPlayList.map((ele, key) => {
      return <Col key={key} style={{ marginLeft: '5px', marginBottom: '10px' }}><a href={ele.playUrl} rel="noopener noreferrer" target="_blank" style={linkStyle} >{ele.title}</a></Col>;
    });
    return (
      <Row type="flex">
        <Col xs={24} sm={8}>
          <img src={posterImg} style={{ maxWidth: '270px', margin: '0 auto 20px', display: 'block', boxShadow: '0 0 10px #999' }} className="img-thumbnail" />
        </Col>
        <Col xs={24} sm={16} style={{ paddingLeft: '30px' }}>
          <Row>
            <Col xs={24} sm={8} md={8} lg={8}>
                <h2 style={{ marginTop: '0' }}>{videoName} </h2>
            </Col>

          </Row>
           <div style={{ fontSize: '16px', marginTop: '0px' }}>  ({`${issueTimeCut}` })</div>
          <div style={columnStyle}>导演：{director}</div>
          <Row style={columnStyle}>
            <Col xs={24} sm={24} md={24} lg={24}>
              主演：
            </Col>
            <Col xs={24} sm={24} md={24} lg={24}>
              <Row>{actorDate}</Row>
            </Col>
          </Row>
          <div className="dramaPlot">剧情：{dramaPlot}</div>
          <Row type="flex" offset={8}>
            <Col xs={24} sm={24} md={24} lg={24}>
              <div style={{ fontSize: '16px', marginBottom: '15px', marginTop: '15px' }}>播放连接：</div>
            </Col>
            {links}
        </Row>
        </Col >

      </Row >
    );
  }
}
//  <Col xs={24} sm={6} md={6} lg={6}>
// <div style={columnStyle}>编剧：{screenPlay}</div>
//             </Col>
