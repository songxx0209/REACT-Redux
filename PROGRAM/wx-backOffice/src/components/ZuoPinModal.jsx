import React from 'react';
import { connect } from 'react-redux';
import { Col, Row, Button, Modal, Form, Input, message, InputNumber, Upload, Icon, Card, Select } from 'antd';
import { addZuoPinItem, uploadZuoPinItem, zuoPinModalHide, setCacheEditorValue, setCacheFormValue, setCacheMediaSrc } from '../actions/zuoPinActions';
import ZuoPinEditor from './ZuoPinEditor';

const createForm = Form.create;
const FormItem = Form.Item;
const Option = Select.Option;
const Dragger = Upload.Dragger;

@connect((store) => {
  return {
    zuoPinStore: store.zuoPinStore,
  };
})

class ZuoPinModal extends React.Component {
  handleOk() {
    this.props.form.validateFields((errors, values) => {
      if (errors) {
        return;
      } else {
        const formValues = this.props.form.getFieldsValue();
        if (this.props.tabkey === '1') {
          formValues.content = window.editor.getHTML();
          formValues.link = '';
        } else if (this.props.tabkey === '2') {
          const dom = new DOMParser().parseFromString(formValues.link, 'text/html');
          const mediaSrc = dom.querySelector('iframe').getAttribute('src');
          formValues.link = '<iframe src=' + mediaSrc + ' width=100% height=100% frameborder=0></iframe>';
          formValues.content = '';
        } else if (this.props.tabkey === '3') {
          const dom = new DOMParser().parseFromString(formValues.link, 'text/html');
          const mediaSrc = dom.querySelector('iframe').getAttribute('src');
          formValues.link = '<iframe src=' + mediaSrc + ' width=100% height=100% frameborder=0></iframe>';
          formValues.content = '';
        }
        formValues.contentType = this.props.tabkey;
        formValues.activeId = this.props.zuoPinStore.activeId;
        if (this.props.zuoPinStore.addOrEdit) {
          this.props.dispatch(addZuoPinItem(formValues));
        } else {
          formValues.optionId = this.props.zuoPinStore.optionId;
          this.props.dispatch(uploadZuoPinItem(formValues));
        }
      }
    });
  }

  handleCancel() {
    this.props.dispatch(zuoPinModalHide());
  }

  uploadImage(info) {
    if (info.file.status === 'done') {
      this.props.form.setFieldsValue({ img: info.file.response.data });
      message.success(`${info.file.name} 图片上传成功.`, 4);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} 图片上传失败!`, 4);
    }
  }

  checkAdImage(rule, value, callback) {
    if (value) {
      callback();
    } else {
      callback('请上传图片！');
    }
  }

  checkMediaSrc(rule, value, callback) {
    if (this.props.tabkey === '1') {
      callback();
    } else {
      if (value) {
        const domGetSrc = new DOMParser().parseFromString(value, 'text/html');
        if (domGetSrc.querySelector('iframe') && domGetSrc.querySelector('iframe').getAttribute('src')) {
          this.props.dispatch(setCacheMediaSrc(domGetSrc.querySelector('iframe').getAttribute('src'), true));
          callback();
        } else {
          this.props.dispatch(setCacheMediaSrc('', false));
          callback('请输入正确格式的地址!');
        }
      } else {
        this.props.dispatch(setCacheMediaSrc('', false));
        callback('请输入媒体地址!');
      }
    }
  }

  valueChange(name, value) {
    if (window.editor) {
      const editorValue = window.editor.getHTML();
      this.props.dispatch(setCacheEditorValue(editorValue));
    }
    let rules = '';
    if (name === 'title') {
      rules = [{ required: true, message: '请输入作品标题!' }];
    } else if (name === 'source') {
      rules = [{ required: true, message: '请选择作品来源!' }];
    } else if (name === 'author') {
      rules = [{ required: true, message: '请输入作者或者团队名!' }];
    } else if (name === 'description') {
      rules = [{ required: true, message: '请输入团队或作品介绍!' }];
    } else if (name === 'link') {
      if (this.props.tabkey === '2') {
        rules = [{ validator: this.checkMediaSrc.bind(this) }];
      } else if (this.props.tabkey === '3') {
        rules = [{ validator: this.checkMediaSrc.bind(this) }];
      }
    }
    const { getFieldDecorator } = this.props.form;
    getFieldDecorator(name, { valuePropName: value, rules });
  }

  render() {
    const { confirmLoading, sourceList, zuoPinModalIsShow, addOrEdit, activeId, optionId, cacheEditorValue, cacheMediaSrc, isMediaShow } = this.props.zuoPinStore;
    const { getFieldDecorator, setFieldsValue, getFieldsValue } = this.props.form;
    const { tabkey } = this.props;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    const postImg = getFieldsValue().img;
    let options = '';
    if (sourceList) {
      options = sourceList.map(item => {
        return <Option value={`${item.source}`} key={item.source}>{item.sourceName}</Option>
      })
    }

    let modalTitle = '';
    let mediaInput = '';
    let mediaBox = '';
    if (tabkey === '2') {
      modalTitle = addOrEdit ? '添加视频作品' : '编辑视频作品';
      mediaInput = <FormItem {...formItemLayout} label="视频地址" hasFeedback>
              {getFieldDecorator('link', {
                rules: [
                  { validator: this.checkMediaSrc.bind(this) },
                ],
              })(
                <Input type="textarea" placeholder="粘贴代码,样例: <iframe src=http://player.youku.com/embed/XMTgzMjE3NjM0OA==></iframe>" autosize={{ minRows: 3 }} onChange={this.valueChange.bind(this, 'link')} />
              )}
            </FormItem>;

      mediaBox = <Col span={14} offset={6} style={{ marginBottom: '15px' }} >
              <iframe src={cacheMediaSrc} style={{ width: '100%', height: '400px', border: 'none', margin: '10px 0 20px', display: isMediaShow ? 'block' : 'none' }}>
              </iframe>
            </Col>
    } else if (tabkey === '1') {
      modalTitle = addOrEdit ? '添加影评作品' : '编辑影评作品';
      mediaInput = '';
      mediaBox = <ZuoPinEditor content={this.props.zuoPinModalInit.content} />
    } else if (tabkey === '3') {
      modalTitle = addOrEdit ? '添加音频作品' : '编辑音频作品';
      mediaInput = <FormItem {...formItemLayout} label="音频地址" hasFeedback>
              {getFieldDecorator('link', {
                rules: [
                  { validator: this.checkMediaSrc.bind(this) },
                ],
              })(
                <Input type="textarea" placeholder="粘贴代码,样例: <iframe src=https://v.qq.com/iframe/player.html?vid=t0022o60r1u&tiny=0&auto=0></iframe>" autosize={{ minRows: 3 }} onChange={this.valueChange.bind(this, 'link')} />
              )}
            </FormItem>;
      mediaBox = <Col span={14} offset={6} style={{ marginBottom: '15px' }} >
              <iframe src={cacheMediaSrc} style={{ width: '100%', height: '400px', border: 'none', margin: '10px 0 20px', display: isMediaShow ? 'block' : 'none' }}>
              </iframe>
            </Col>;
    }
    const propsUploadImage = {
      name: 'filename',
      action: 'http://service.handsight.com.cn/common/upload?action=uploadimage&encode=utf-8',
      data: {
        type: '1',
      },
      showUploadList: false,
      listType: 'picture',
      accept: 'image/*',
      headers: {
        'X-Requested-With': null,
      },
      onChange: this.uploadImage.bind(this),
    };

    return (
      <div>
        <Modal
          visible={zuoPinModalIsShow}
          title={modalTitle}
          width={1000}
          confirmLoading={confirmLoading}
          onOk={this.handleOk.bind(this)}
          onCancel={this.handleCancel.bind(this)}
        >
          <Form horizontal>
            <FormItem {...formItemLayout} label="作品来源">
              {getFieldDecorator('source', {
                rules: [
                  { required: true, message: '请选择作品来源!' },
                ],
              })(
                <Select placeholder="作品来源" onChange={this.valueChange.bind(this, 'source')}>
                  { options }
                </Select>
              )}
            </FormItem>

            <FormItem {...formItemLayout} label="作品标题" hasFeedback>
              {getFieldDecorator('title', {
                rules: [
                  { required: true, message: '请输入作品标题!' },
                ],
              })(
                <Input placeholder="请输入作品标题" onChange={this.valueChange.bind(this, 'title')} />
              )}
            </FormItem>

            <FormItem {...formItemLayout} label="作者/团队名" hasFeedback>
              {getFieldDecorator('author', {
                rules: [
                  { required: true, message: '请输入作者或者团队名!' },
                ],
              })(
                <Input placeholder="请输入作者或者团队名" onChange={this.valueChange.bind(this, 'author')} />
              )}
            </FormItem>

             <FormItem {...formItemLayout} label="团队或作品介绍" hasFeedback>
              {getFieldDecorator('description', {
                rules: [
                  { required: true, message: '请输入团队或作品介绍!' },
                ],
              })(
                <Input type="textarea" placeholder="请输入团队或作品介绍" autosize={{ minRows: 5 }} onChange={this.valueChange.bind(this, 'description')} />
              )}
            </FormItem>

            <FormItem {...formItemLayout} label="上传封面图">
              {getFieldDecorator('img', {
                rules: [
                  { validator: this.checkAdImage.bind(this) },
                ],
              })(
                <Row>
                  <Col span={24}>
                     <div style={{ height: 140 }}>
                      <Dragger {...propsUploadImage}>
                        <p className="ant-upload-drag-icon">
                          <Icon type="inbox" />
                        </p>
                        <p className="ant-upload-text">点击选择文件或将文件拖入指定区域，完成上传</p>
                      </Dragger>
                    </div>
                  </Col>
                  <Col span={24}>
                    <img className="img-thumbnail" src={ postImg } style={{ maxWidth: '100%', height: 'auto', margin: '15px auto 0', display: 'block' }} />
                  </Col>
                </Row>
              )}
            </FormItem>
            { mediaInput }
          </Form>
          <Row>
            { mediaBox }
          </Row>
        </Modal>
      </div>
    )
  }
}

// 添加或编辑初始化表单,数据保存在store里
export default ZuoPinModal = Form.create({
  onFieldsChange(props, fields) {
    props.dispatch(setCacheFormValue(fields));
  },
  mapPropsToFields(props) {
    if (props.zuoPinModalInit) {
      const { source, title, author, description, img, link } = props.zuoPinModalInit;
      const sourceStr = `${source.value}`;
      let mediaSrc = '';
      if (props.tabkey === '2') {
        mediaSrc = link;
        return {
          title,
          source: { value: sourceStr },
          author,
          description,
          img,
          link,
        };
      } else if (props.tabkey === '1') {
        return {
          title,
          source: { value: sourceStr },
          author,
          description,
          img,
        };
      } else if (props.tabkey === '3') {
        return {
          title,
          source: { value: sourceStr },
          author,
          description,
          img,
          link,
        };
      }
    } else {
      return {};
    }
  },
})(ZuoPinModal);


              // <audio src={mediaSrc} style={{ width: '100%' }} controls="controls">
              // </audio>

