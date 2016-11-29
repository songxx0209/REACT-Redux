import React from 'react';
import { Button, Upload, message, Icon, Col, Row } from 'antd';
import axios from 'axios';

const ButtonGroup = Button.Group;

export default class MyEditor extends React.Component {
  addImage(info) {
    if (info.file.status === 'done') {
      const src = info.file.response.data;
      message.success(`${info.file.name} 图片插入成功.`);
      window.editor.insertImage(src);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} 图片插入失败!`);
    }
  }

  addWord(info) {
    if (info.file.status === 'done') {
      const wordHtml = info.file.response;
      axios.get(wordHtml).then((res) => {
        const wordDom = new DOMParser().parseFromString(res.data, 'text/html');
        editor.setHTML(wordDom.body.innerHTML);
        message.success(`${info.file.name} 文档上传成功.`);
      });
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} 文档上传失败!`);
    }
  }

  componentDidMount() {
    const editorDiv = this.refs.editor;
    window.editor = new Squire(editorDiv, {
      blockTag: 'p',
    });
    window.editor.setHTML(this.props.content);
  }

  render() {
    if (window.editor) {
      window.editor.setHTML(this.props.content);
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
    const propsword = {
      name: 'filename',
      action: 'http://service.handsight.com.cn/common/wordtohtml',
      showUploadList: false,
      accept: 'application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      headers: {
        'X-Requested-With': null,
      },
      onChange: this.addWord.bind(this),
    };

    return (
      <div style={{ width: '100%', height: 'auto', border: '1px solid #d9d9d9', paddingBottom: '10px', borderRadius: '6px' }}>
        <div id="editor" style={{ height: 'auto', outline: 'none', padding: ' 10px 10px 0' }} ref='editor'></div>
        <hr style={{ marginBottom: '10px' }} />
        <Row style={{ padding: '0 10px' }} >
          <Col span={3}>
            <Upload {...propsImg}>
              <Button>插入图片</Button>
            </Upload>
          </Col>
          <Col span={5}>
            <Upload {...propsword}>
              <Button>上传word</Button>
            </Upload>
          </Col>
        </Row>
      </div>
    )
  }
}