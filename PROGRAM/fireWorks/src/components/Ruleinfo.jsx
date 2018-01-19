import React from 'react';
import { Modal, Button } from 'antd';
import { ruleModal } from '../actions/getActiveAction';


export default class Ruleinfo extends React.Component {
  ruleModalShow() {
    this.props.dispatch(ruleModal(true));
  }
  ruleModalHide() {
    this.props.dispatch(ruleModal(false));
  }
  render() {
    const { visible, ruleText } = this.props;
    const ruleWrap = {
      position: 'absolute',
      top: '0.4rem',
      right: '0.2rem',
      color: '#333',
    };
    const inner = <div dangerouslySetInnerHTML={{ __html: ruleText }} style={{ fontSize: '14px' }} />;
    const footerEle = <div style={{ width: '100%', height: '100%' }}><Button style={{ width: '100%', height: '100%', border: 'none', fontSize: '15px' }} type="ghost" onClick={this.ruleModalHide.bind(this)}>关闭</Button></div>;
    return (
      <div style={ruleWrap}>
        <Button onClick={this.ruleModalShow.bind(this)} style={{ backgroundColor: 'transparent', border: 'none', color: '#fff', fontSize: '14px' }}>规则说明</Button>
        <Modal title="规则说明" footer={footerEle} closable={false} visible={visible}>
          {inner}
        </Modal>
      </div>
    );
  }
}
