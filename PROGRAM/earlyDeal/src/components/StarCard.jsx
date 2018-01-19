import React from 'react';
import { Card } from 'antd';

export default class VideoDetail extends React.Component {
  render() {
    const { coverPic, movieTitle, issueTime, roleName } = this.props.data;
    const baseCss = {
      padding: '0 10px',
      color: '#333',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
    };
    const imgStyle = {
      width: 0,
      height: 0,
      paddingRight: '100%',
      paddingBottom: '135%',
      maxWidth: '100%',
      background: `url(${coverPic}) 0% 0%/cover no-repeat`,
    };
    return (
      <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12" style={{ marginBottom: '30px' }}>
        <Card bordered style={{ width: '240px', maxWidth: '100%', margin: '0 auto', minHeight: '431px', maxHeight: '431px' }} bodyStyle={{ padding: 0 }}>
          <div style={imgStyle} className="custom-image"  />
          <div className="custom-card">
            <h4 style={baseCss}>{movieTitle}</h4>
            <p style={{ ...baseCss, fontSize: '14px' }}>上映时间:{issueTime}</p>
            <p style={{ ...baseCss, fontSize: '14px' }}>饰演:       {roleName}</p>
          </div>
        </Card>
      </div>
    );
  }
}
