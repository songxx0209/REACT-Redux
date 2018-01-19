import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';
import { getAppId, cancelModule, getReward } from '../actions/getActiveAction';
import Ruleinfo from '../components/Ruleinfo';
import History from '../components/History';
import Spin from '../components/Spin';

@connect((store) => {
  return {
    getActive: store.getActive,
  };
})

export default class IndexPage extends React.Component {
  componentWillMount() {
    this.props.dispatch(getAppId());
  }
  componentDidMount() {
    window.music = document.getElementById('music');
    window.fireworks = new Fireworks();
  }
  handleGetReward() {
    const { clickAble } = this.props.getActive;
    if (clickAble) {
      const appId = localStorage.getItem('YH_appid');
      this.props.dispatch(getReward(appId));
    }
  }
  handleCancel() {
    this.props.dispatch(cancelModule());
  }
  render() {
    const { popMark, display, rewardsId, spinning, spinErr, spinOk, ruleText, ruleMark, historyMark, historyText } = this.props.getActive;
    const wordStyle = {
      display,
      position: 'absolute',
      top: '1.5rem',
      width: '3rem',
      height: '7rem',
      left: '50%',
      marginLeft: '-0.65rem',
      background: `url(${ENV.wordImg})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
    };
    const getBtnStyle = {
      position: 'absolute',
      bottom: '4rem',
      textAlign: 'center',
      width: '3.6rem',
      height: '5.5rem',
      left: '50%',
      opacity: '0',
      marginLeft: '-1.8rem',
    };
    const msgImg = rewardsId === '-1' ? ENV.noImg : ENV.yesImg;
    const modalStyle = {
      position: 'absolute',
      top: '0',
      left: '0',
      right: '0',
      bottom: '0',
      backgroundColor: 'rgba(55, 55, 55, 0.6)',
      display: popMark ? 'block' : 'none',
      overflow: 'hidden',
      zIndex: '1000',
    };
    const modalTop = {
      width: '86%',
      margin: '0 auto',
      maxWidth: '86%',
      maxHeight: '90%',
      display: 'block',
    };
    const boxStyle = {
      position: 'absolute',
      top: '0',
      left: '0',
      right: '0',
      bottom: '0',
    };
    return (
      <div style={boxStyle}>
        <div style={modalStyle} >
          <img style={modalTop} src={msgImg} alt="二维码" />
          <div style={{ width: '100%', height: '10%', position: 'absolute', bottom: '0' }} >
            <Button onClick={this.handleCancel.bind(this)} style={{ borderRadius: '18px', border: 'none', width: '35%', height: '36px', display: 'block', margin: '0.2rem auto 0', background: '#b42625', color: '#fff', fontSize: '17px' }}>OK</Button>
          </div>
        </div>
        <Ruleinfo visible={ruleMark} ruleText={ruleText} dispatch={this.props.dispatch} />
        <History visible={historyMark} historyText={historyText} dispatch={this.props.dispatch} />
        <div style={wordStyle} />
        <Button onClick={this.handleGetReward.bind(this)} id="obtn" style={getBtnStyle} />
        <Spin tip="活动加载中..." spinning={spinning} spinErr={spinErr} spinOk={spinOk} />
      </div>
    );
  }
}
