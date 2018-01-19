import React from 'react';
import { Button, Upload, message, Icon, Col, Row } from 'antd';
import axios from 'axios';

const ButtonGroup = Button.Group;

export default class FirstEditor extends React.Component {
  componentDidMount() {
    const editorDiv = this.refs.firsteditor;
    window.firstEditor = new Squire(editorDiv, {
      blockTag: 'p',
    });
    window.firstEditor.setHTML(this.props.content);
  }

  addImage(info) {
    if (info.file.status === 'done') {
      const src = info.file.response.data;
      message.success(`${info.file.name} 图片插入成功.`);
      window.firstEditor.insertImage(src);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} 图片插入失败!`);
    }
  }

  render() {
    if (window.firstEditor) {
      window.firstEditor.setHTML(this.props.content);
    }
    const propsImg = {
      name: 'filename',
      action: 'http://service.handsight.com.cn/common/upload?action=uploadimage&encode=utf-8',
      data: {
        type: '1',
      },
      showUploadList: false,
      accept: 'image/*',
      headers: {
        'X-Requested-With': null,
      },
      onChange: this.addImage.bind(this),
    };

    return (
      <div style={{ width: '100%', height: 'auto', border: '1px solid #d9d9d9', paddingBottom: '10px', borderRadius: '6px' }}>
        <div id="firstEditor" style={{ height: 'auto', outline: 'none', padding: ' 10px 10px 0' }} ref='firsteditor'></div>
        <hr style={{ marginBottom: '10px' }} />
        <Row style={{ padding: '0 10px' }} >
          <Col span={3}>
            <Upload {...propsImg}>
              <Button>插入图片</Button>
            </Upload>
          </Col>
        </Row>
      </div>
    )
  }
}
