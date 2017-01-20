import React from 'react';
import { Row, Col } from 'antd';
import Actor from '../components/Actor';

export default function VideoDetail(props) {
  const { posterImg, videoName, durationTime, attribute, issueTime, showMode, director, screenPlay, actors, dramaPlot } = props.data;
  const issueTimeCut = issueTime.slice(0, 10);
  const columnStyle = {
    fontSize: '16px',
    marginTop: '15px',
  };
  const actorDate = actors.map((actor, i) => {
    return <Actor data={actor} key={i} />;
  });

  return (
      <Row type="flex">
        <Col xs={24} sm={8}>
          <img src={posterImg} style={{ maxWidth: '270px', margin: '0 auto 20px', display: 'block', boxShadow: '0 0 10px #999' }} className="img-thumbnail" />
        </Col>
        <Col xs={24} sm={16} style={{ paddingLeft: '30px' }}>
          <h2 style={{ marginTop: '0' }}>{videoName}</h2>
          <div style={columnStyle}>{`${durationTime} - ${attribute} - ${issueTimeCut} - ${showMode}` }</div>
          <div style={columnStyle}>导演：{director}</div>
          <div style={columnStyle}>编剧：{screenPlay}</div>
          <Row style={columnStyle}>
            <Col xs={24} sm={2} md={2} lg={2}>
              主演：
            </Col>
            <Col xs={24} sm={20} md={20} lg={20}>
              <Row>{actorDate}</Row>
            </Col>
          </Row>
          <div className="dramaPlot" >剧情：{dramaPlot}</div>
        </Col >
      </Row >
  );
}
