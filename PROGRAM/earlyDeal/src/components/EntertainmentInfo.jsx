import React from 'react';
import { Row, Col, Icon } from 'antd';
import Actor from '../components/Actor';

export default class EntertainmentInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMore: false,
    };
  }
  handleClick() {
    const value = !this.state.showMore;
    this.setState({
      showMore: value,
    });
  }
  render() {
    const { posterImg, videoName, issueTime, actors, dramaPlot, videoPlayList } = this.props.data;
    const issueTimeCut = issueTime.slice(0, 10);
    const buttonName = this.state.showMore ? <span><Icon type="up-circle-o" /> 收起</span> : <span><Icon type="down-circle-o" /> 显示全部 </span>;
    const linksStyle = this.state.showMore ? { height: 'auto' } : { height: '160px', overflow: 'hidden' };
    const columnStyle = {
      fontSize: '16px',
      marginTop: '15px',
    };
    const linkStyle = {
      display: 'block',
      width: '100%',
      minWidth: '100%',
      height: '22px',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
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
      return <Col key={key} xs={24} sm={24} md={11} lg={11} style={{ marginLeft: '5px', marginBottom: '10px' }}><a alt={ele.title} target="_blank"style={linkStyle} href={ele.playUrl}>{ele.title}</a></Col>;
    });
    return (
      <Row type="flex">
        <Col xs={24} sm={8}>
          <img src={posterImg} style={{ maxWidth: '270px', margin: '0 auto 20px', display: 'block', boxShadow: '0 0 10px #999' }} className="img-thumbnail" />
        </Col>
        <Col xs={24} sm={16} style={{ paddingLeft: '30px' }}>
          <Row>
            <Col xs={24} sm={24} md={24} lg={24}>
                <h2 style={{ marginTop: '0' }}>{videoName} </h2>
            </Col>
          </Row>
          <div style={{ fontSize: '16px', marginTop: '0px' }}>  ({`${issueTimeCut}` })</div>
          <Row style={columnStyle}>
            <Col xs={24} sm={24} md={24} lg={24}>
              嘉宾：
            </Col>
            <Col xs={24} sm={24} md={24} lg={24}>
              <Row>{actorDate}</Row>
            </Col>
          </Row>
          <div className="dramaPlot">简介：{dramaPlot}</div>
          <Row type="flex" offset={8}>
            <Col xs={24} sm={24} md={24} lg={24}>
              <div style={{ fontSize: '16px', marginBottom: '15px', marginTop: '15px' }}>播放连接：</div>
            </Col>
         </Row>
         <Row type="flex" offset={8} style={linksStyle}>
            {links}
         </Row>
         <Row >
            <Col offset={10} xs={24} sm={24} md={5} lg={5} onClick={this.handleClick.bind(this)}>{buttonName} </Col>
         </Row>
        </Col >

      </Row >
    );
  }
}
//  <Col xs={24} sm={6} md={6} lg={6}>
// <div style={columnStyle}>编剧：{screenPlay}</div>
//             </Col>
//  <div style={columnStyle}>导演：{director}</div>
