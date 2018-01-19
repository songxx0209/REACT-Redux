import React from 'react';
import { Col } from 'antd';

export default class Actor extends React.Component {
  render() {
    const { data } = this.props;
    const imgStyle = {
      background: `url(${data.img}) 0% 0%/cover no-repeat `,
      width: '60px',
      height: '60px',
    };
    return (

      <Col xs={24} sm={8} md={6} lg={6} style={{ marginBottom: '12px', position: 'reletive', height: '80px' }}>
        <div>
          <p style={{ margin: '0px' }}>
              <div className="img-thumbnail" style={imgStyle} />
          </p>
          <p style={{ fontSize: '12px', margin: '0px' }}>{data.relation}-{data.name}</p>
        </div>
      </Col>
    );
  }
}
