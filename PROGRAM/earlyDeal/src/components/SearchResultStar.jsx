import React from 'react';
import { Link } from 'react-router';
import { Card } from 'antd';

export default class SearchResultStar extends React.Component {
  render() {
    const { name, avatar, id } = this.props.data;
    const url = `starpage/${id}`;
    const imgStyle = {
      width: 0,
      height: 0,
      paddingRight: '100%',
      paddingBottom: '135%',
      maxWidth: '100%',
      background: `url(${avatar}) 0% 0%/cover no-repeat`,
    };
    // style={{ height: '340px' }}
    return (
      <Link to={url}>
        <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12" style={{ marginBottom: '30px' }}>
          <Card bordered style={{ width: '240px', maxWidth: '100%', margin: '0 auto', height: '380px' }} bodyStyle={{ padding: 0 }}>
            <div className="custom-image" style={imgStyle}  />
            <div className="custom-card">
              <h4 style={{ padding: '0 15px', color: '#333', fontSize: '16px' }}>{name}</h4>
            </div>
          </Card>
        </div>
      </Link>
    );
  }
}

 // <img src={avatar} alt="演员头像" width="100%" style={{ height: 'auto', maxHeight: '340px' }} />
