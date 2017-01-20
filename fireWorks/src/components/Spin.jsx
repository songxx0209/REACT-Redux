import React from 'react';
import { Icon } from 'antd';

export default class Spin extends React.Component {
  render() {
    const { spinning, spinErr, spinOk } = this.props;
    const loadingBoxStyle = {
      position: 'absolute',
      top: '0',
      left: '0',
      right: '0',
      bottom: '0',
      zIndex: '4',
      color: '#fff',
      display: spinning ? 'block' : 'none',
      backgroundColor: '#ed5565',
    };
    const loadingCenterStyle = {
      position: 'absolute',
      width: '100%',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      WebkitTransform: 'translate(-50%, -50%)',
      zIndex: '5',
      display: spinOk ? 'block' : 'none',
    };
    const loadingCircleStyle = {
      width: '50px',
      height: '50px',
      borderRadius: '50%',
      backgroundColor: '#fff',
      margin: '0 auto',
    };
    const loadingTopStyle = {
      textAlign: 'center',
      fontSize: '13px',
      marginTop: '3px',
    };
    const failStyle = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      fontSize: '35px',
      textAlign: 'center',
      width: '100%',
      transform: 'translate(-50%, -50%)',
      WebkitTransform: 'translate(-50%, -50%)',
      display: spinErr ? 'block' : 'none',
    };
    return (
      <div style={loadingBoxStyle}>
        <div style={loadingCenterStyle}>
          <div style={loadingCircleStyle} className="spin-circle" />
          <div style={loadingTopStyle}>{this.props.tip}</div>
        </div>
        <div style={failStyle}>
          <Icon type="frown-o" />
          <p style={{ fontSize: '13px' }}>活动加载出错</p>
        </div>
      </div>
    );
  }
}
