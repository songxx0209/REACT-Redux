import React from 'react';
import { Modal, Button } from 'antd';
import { historyModalShow, historyModalHide } from '../actions/getActiveAction';


export default class Ruleinfo extends React.Component {
  historyModalShow() {
    this.props.dispatch(historyModalShow());
  }
  historyModalHide() {
    this.props.dispatch(historyModalHide());
  }
  render() {
    const { visible, historyText } = this.props;
    const ruleWrap = {
      position: 'absolute',
      bottom: '0.3rem',
      color: '#333',
      width: '100%',
      textAlign: 'center',
    };
    let inner = '';
    if (historyText && historyText !== 'error') {
      const historyObj = JSON.parse(historyText);
      inner = historyObj.map((item) => {
        const name = (item.nickName.length > 8 ? `${item.nickName.substring(0, 8)}…` : item.nickName) || '你';
        return <p style={{ fontSize: '14px' }}>{item.createTime} {name}获得：{item.rewardsName}</p>;
      });
    } else if (historyText === 'error') {
      inner = <p style={{ fontSize: '14px' }}>数据获取异常！</p>;
    } else {
      inner = <p style={{ fontSize: '14px' }}>你还没有中过奖哦，再接再厉！</p>;
    }
    const footerEle = <div style={{ width: '100%', height: '100%' }}><Button style={{ width: '100%', height: '100%', border: 'none', fontSize: '15px' }} type="ghost" onClick={this.historyModalHide.bind(this)}>关闭</Button></div>;
    return (
      <div style={ruleWrap}>
        <Button onClick={this.historyModalShow.bind(this)} style={{ backgroundColor: 'transparent', border: 'none', color: '#fff', fontSize: '16px' }}>查看我的中奖纪录</Button>
        <Modal title="我的中奖纪录" footer={footerEle} closable={false} visible={visible}>
          {inner}
        </Modal>
      </div>
    );
  }
}
