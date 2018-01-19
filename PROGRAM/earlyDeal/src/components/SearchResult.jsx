import React from 'react';
import { Link } from 'react-router';
import { Card } from 'antd';

export default class SearchResult extends React.Component {
  render() {
    const { videoName, issueTime, id, videoTypeId, posterImg } = this.props.data;
    const videoSetId = this.props.data.videoSetId || 0;
    let { attribute } = this.props.data;
    const issueTimeCut = issueTime.slice(0, 10);
    const url = `videopage/${videoTypeId}/${id}/${videoSetId}`;
    if (videoTypeId === 2) {
      attribute = '电视剧';
    } else if (videoTypeId === 3) {
      attribute = '综艺节目';
    }
    const imgStyle = {
      width: 0,
      height: 0,
      paddingRight: '100%',
      paddingBottom: '145%',
      maxWidth: '100%',
      background: `url(${posterImg}) 0% 0%/cover no-repeat`,
    };
    const baseCss = {
      padding: '0 10px',
      color: '#333',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
    };
    return (
      <Link to={url}>
        <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12" style={{ marginBottom: '30px' }}>
          <Card bordered style={{ width: '240px', maxWidth: '100%', margin: '0 auto', minHeight: '431px' }} bodyStyle={{ padding: 0 }}>
            <div className="custom-image" style={imgStyle} />
            <div className="custom-card">
              <h4 style={baseCss}>{videoName}</h4>
              <p style={{ padding: '0 10px', color: '#333', fontSize: '14px' }}>{`${attribute} - ${issueTimeCut}`}</p>
            </div>
          </Card>
        </div>
      </Link>
    );
  }
}

// <img src={posterImg} alt="影片海报" width="100%" />
