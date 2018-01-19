import React from 'react';
import { Link } from 'react-router';
import { Col } from 'antd';

export default class Actor extends React.Component {
  render() {
    const { videoTypeId } = this.props;
    const { data } = this.props;
    const divStyle = {
      height: '58px',
      width: '150px',
      overflow: 'hidden',
      fontSize: '14px',
      position: 'absolute',
      top: '0',
      left: '65px',
    };
    const pStyle = {
      height: '17px',
      marginBottom: '1px',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
    };
    let word = '饰：';
    if (videoTypeId === 2 && !data.roleName) {
      word = '';
      pStyle.lineHeight = '45px';
      pStyle.overflow = '';
    }
    const imgStyle = {
      background: `url(${data.avatar}) 0% 0%/cover no-repeat `,
      width: '60px',
      height: '60px',
    };
    return (
      <Link to={`/?starName=${data.chineseName}`}>
        <Col xs={24} sm={12} md={12} lg={12} style={{ marginBottom: '12px', position: 'reletive', height: '58px' }}>
          <div className="img-thumbnail" style={imgStyle} />
          <div style={divStyle}>
            <p style={pStyle}>{data.chineseName}</p>
            <p style={pStyle}>{data.originalName}</p>
            <p style={pStyle}>{word} {data.roleName}</p>
          </div>
        </Col>
      </Link>
    );
  }
}
// <img src={data.avatar} style={imgStyle} alt={data.chineseName} className="img-thumbnail" />
