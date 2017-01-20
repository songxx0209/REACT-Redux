import React from 'react';
import { Modal } from 'antd';

export default class ShowImg extends React.Component {
  constructor(){
    super();
    this.state = {
      modalVisible: false,
      img_src:'',
    }
  }

  setModalVisible(modalVisible) {
    this.setState({ modalVisible });
  }

  info(e) {
    console.log(e.target.src);
    this.setState({ 
      modalVisible: true,
      img_src:e.target.src,
    });
  }

  render() {
    const { data } = this.props;
    const Imgs = data.map((ele, i) => {
      return <img onClick={this.info.bind(this)} src={ele} key={i} style={{ height: '150px' }} />;
    });
    return (
      <div>
        {Imgs}
        <Modal
          title="预览"
          width='1280px'
          visible={this.state.modalVisible}
          onOk={() => this.setModalVisible(false)}
          onCancel={() => this.setModalVisible(false)}
          footer=''
        >
          <img src={this.state.img_src} style={{maxWidth:'100%', margin:'0 auto', display:'block'}} />
        </Modal>
      </div>
    );
  }
}
