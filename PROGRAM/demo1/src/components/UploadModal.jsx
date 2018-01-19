import React from 'react';
import { connect } from 'react-redux';
import { Col, Row, Button, Modal, Form, Input, notification, message, InputNumber, Upload, Icon, Card, Select } from 'antd';
import MyEditor from './MyEditor';
import { modalShow, modalInit, changeImgSrc, changeVideoSrc, addZuopingItem } from '../actions/modalAction';
const createForm = Form.create;
const FormItem = Form.Item;
const Option = Select.Option;
const Dragger = Upload.Dragger;

@connect((store) => {
  return {
    modalIsShow: store.modalData.modalIsShow,
    posterImg: store.modalData.posterImg,
    mediaSrc: store.modalData.mediaSrc,
    isVideoShow: store.modalData.isVideoShow,
    sourceData: store.modalData.sourceData,
    confirmLoading: store.modalData.confirmLoading,
  };
})

class UploadModal extends React.Component {
  constructor(props) {
    super(props);
  }

  handleOk() {
    this.props.form.validateFields((errors, values) => {
      if (errors) {
        return;
      } else {
        let values = this.props.form.getFieldsValue();
        if (this.props.tabkey === '2') {
          values.content = window.editor.getHTML();
        }
        values.mediaSrc = this.props.mediaSrc;
        this.props.dispatch(modalShow(false));
        this.props.dispatch(addZuopingItem(values));
        // this.props.form.resetFields();
      }
    });
  }

  handleCancel() {
    this.props.dispatch(modalShow(false));
    const { tabkey } = this.props;
    if (tabkey === '1') {
    } else if (tabkey === '2') {
      // window.editor.setHTML('<p></p>');
    } else if (tabkey === '3') {
    }
    this.props.form.resetFields();
  }

  uploadImage(info) {
    if (info.file.status !== 'uploading') {
    }
    if (info.file.status === 'done') {
      this.props.form.setFieldsValue({ videoImage: info.file.response.data });
      this.props.dispatch(changeImgSrc(info.file.response.data));
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

  checkVideoSrc(rule, value, callback) {
    if (value) {
      const domGetSrc = new DOMParser().parseFromString(value, 'text/html');
      if (domGetSrc.querySelector('iframe') && domGetSrc.querySelector('iframe').getAttribute('src')) {
        const mediaSrc = domGetSrc.querySelector('iframe').getAttribute('src');
        this.props.dispatch(changeVideoSrc(mediaSrc));
        callback();
      } else {
        this.props.dispatch(changeVideoSrc(''));
        callback('请输入正确格式的视频地址!');
      }
    } else {
      this.props.dispatch(changeVideoSrc(''));
      callback('请输入视频地址!');
    }
  }

  checkAudioSrc(rule, value, callback) {
    if (value) {
      if (value.indexOf('http') !== -1) {
        this.props.dispatch(changeVideoSrc(value));
        callback();
      } else {
        this.props.dispatch(changeVideoSrc(''));
        callback('请输入正确格式的音频地址!');
      }
    } else {
      this.props.dispatch(changeVideoSrc(''));
      callback('请输入音频地址!');
    }
  }

  render() {
    const { getFieldDecorator, getFieldError, isFieldValidating, setFieldsValue } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };

    let selectData = '';
    if (this.props.sourceData) {
      selectData = this.props.sourceData.map(item => {
        return <Option value={item.value} key={item.value}>{item.name}</Option>
      })
    }

    const { tabkey } = this.props;
    // let editor = '';
    let modalTitle = '';
    let mediaInput = '';
    let mediaBox = '';
    if (tabkey === '1') {
      modalTitle = '添加视频作品';
      mediaInput = <FormItem {...formItemLayout} label="视频地址" hasFeedback>
              {getFieldDecorator('mediaSrc', {
                rules: [
                  { validator: this.checkVideoSrc.bind(this) },
                ],
              })(
                <Input type="textarea" placeholder="粘贴代码,样例: <iframe src=http://player.youku.com/embed/XMTgzMjE3NjM0OA==></iframe>" autosize={{ minRows: 3 }} />
              )}
            </FormItem>;

      mediaBox = <Col span={14} offset={6} style={{ marginBottom: '15px' }} >
              <iframe src={this.props.mediaSrc} style={{ width: '100%', height: '400px', border: 'none', margin: '10px 0 20px', display: this.props.isVideoShow ? 'block' : 'none' }}>
              </iframe>
            </Col>

    } else if (tabkey === '2') {
      modalTitle = '添加影评作品';
      mediaBox = <MyEditor content={this.props.modalInit.content} />
    } else if (tabkey === '3') {
      modalTitle = '添加音频作品';
      mediaInput = <FormItem {...formItemLayout} label="音频地址" hasFeedback>
              {getFieldDecorator('mediaSrc', {
                rules: [
                  { validator: this.checkAudioSrc.bind(this) },
                ],
              })(
                <Input type="textarea" placeholder="粘贴代码,样例: http://player.youku.com/embed/XMTgzMjE3NjM0OA.mp4" autosize={{ minRows: 3 }} />
              )}
            </FormItem>;
      mediaBox = <Col span={14} offset={6} style={{ marginBottom: '15px' }} >
              <audio src={this.props.mediaSrc} style={{ display: this.props.isVideoShow ? 'block' : 'none', width: '100%' }}  controls="controls">
              </audio>
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
          visible={this.props.modalIsShow}
          title={modalTitle}
          width={1000}
          confirmLoading={this.props.confirmLoading}
          onOk={this.handleOk.bind(this)}
          onCancel={this.handleCancel.bind(this)}
        >
          <Form horizontal>
            <FormItem {...formItemLayout} label="作品来源">
              {getFieldDecorator('videoSource', {
                rules: [
                  { required: true, message: '请选择作品来源!' },
                ],
              })(
                <Select placeholder="作品来源">
                  { selectData }
                </Select>
              )}
            </FormItem>

            <FormItem {...formItemLayout} label="作品标题" hasFeedback>
              {getFieldDecorator('videoTitle', {
                rules: [
                  { required: true, message: '请输入作品标题!' },
                ],
              })(
                <Input placeholder="请输入作品标题" />
              )}
            </FormItem>

            <FormItem {...formItemLayout} label="作者/团队名" hasFeedback>
              {getFieldDecorator('videoAuthor', {
                rules: [
                  { required: true, message: '请输入作者或者团队名!' },
                ],
              })(
                <Input placeholder="请输入作者或者团队名" />
              )}
            </FormItem>

             <FormItem {...formItemLayout} label="团队或作品介绍" hasFeedback>
              {getFieldDecorator('videoDes', {
                rules: [
                  { required: true, message: '请输入团队或作品介绍!' },
                ],
              })(
                <Input type="textarea" placeholder="请输入团队或作品介绍" autosize={{ minRows: 5 }} />
              )}
            </FormItem>

            <FormItem {...formItemLayout} label="上传封面图">
              {getFieldDecorator('videoImage', {
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
                    <img className="img-thumbnail" src={ this.props.posterImg } style={{ maxWidth: '100%', height: 'auto', marginTop: '15px' }} />
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

export default UploadModal = Form.create(
  {
  mapPropsToFields(props) {
    if (props.modalInit) {
      // console.log(props.modalInit);
      let mediaSrc = '';
      if (props.modalInit.mediaSrc) {
        if (props.tabkey === '1') {
          mediaSrc = '<iframe src=' + props.modalInit.mediaSrc + '></iframe>';
        } else if (props.tabkey === '2') {
          // mediaSrc = props.modalInit.videoSrc;
        } else if (props.tabkey === '3') {
          mediaSrc = props.modalInit.mediaSrc;
        }
      }
      return {
        videoTitle: { value: props.modalInit.videoTitle },
        videoSource: { value: props.modalInit.videoSource },
        videoAuthor: { value: props.modalInit.videoAuthor },
        videoDes: { value: props.modalInit.videoDes },
        videoImage: { value: props.modalInit.videoImage },
        mediaSrc: { value: mediaSrc },
      };
    }
  },
}
)(UploadModal);


//  <Row>
//             <Col span={14} offset={6} style={{ marginBottom: '15px' }} >
//               <iframe src={this.props.mediaSrc} style={{ width: '100%', height: '400px', border: 'none', margin: '10px 0 20px', display: this.props.isVideoShow ? 'block' : 'none' }}>
//               </iframe>
//             </Col>
//           </Row>

