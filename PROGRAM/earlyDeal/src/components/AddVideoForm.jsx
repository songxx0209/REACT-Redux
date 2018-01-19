import React from 'react';
import { connect } from 'react-redux';
import { Modal, Form, Input, Select, Button } from 'antd';
import { addVideo, videoModalClose, videoModalOpen } from '../actions/addAcions';

const FormItem = Form.Item;
const Option = Select.Option;

@connect((store) => {
  return {
    add: store.add,
  };
})

class VideoForm extends React.Component {


  handleOk() {
    this.props.form.validateFields((errors, values) => {
      if (errors) {
        return;
      }
      this.props.dispatch(addVideo(values));
    });
  }

  handleCancel() {
    this.props.dispatch(videoModalClose());
  }
  showMovieModal() {
    this.props.form.resetFields();
    this.props.dispatch(videoModalOpen());
  }
  checkYear(rule, value, callback) {
    if (value !== '') {
      if (parseInt(value, 10) > 2020 || parseInt(value, 10) < 1920) {
        callback('请输入年份例如:2017');
      } else {
        callback();
      }
    } else {
      callback();
    }
  }
  render() {
    const { getFieldDecorator, getFieldError, isFieldValidating } = this.props.form;
    const { videoFetching, vModalShow } = this.props.add;
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 16 },
    };
    return (
      <div>
      <Button type="primary" size="large" onClick={this.showMovieModal.bind(this)} style={{ marginRight: '20px', float: 'right' }}>添加影片</Button>
      <Modal title="添加影片" visible={vModalShow} width={600} confirmLoading={videoFetching} onOk={this.handleOk.bind(this)} onCancel={this.handleCancel.bind(this)} >
        <Form horizontal>
          <FormItem {...formItemLayout} label="影片名" hasFeedback help={isFieldValidating('videoName') ? 'validating...' : (getFieldError('videoName') || []).join(', ')}>
            {getFieldDecorator('videoName', {
              rules: [
                { required: true, min: 1, max: 30, message: '请输入正确的影片名' },
              ],
            })(
              <Input placeholder="请输入视频名称" />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="视频分类" help={isFieldValidating('videoTypeId') ? 'validating...' : (getFieldError('videoTypeId') || []).join(', ')}>
            {getFieldDecorator('videoTypeId', {
              rules: [
                { required: true, message: '请选择视频分类' },
              ],
            })(
              <Select size="large" placeholder="请选择视频分类" >
                <Option value="1">电影</Option>
                <Option value="2">电视剧</Option>
                <Option value="3">综艺</Option>
              </Select>
            )}
          </FormItem>
          <hr />
            附加条件
          <FormItem {...formItemLayout} label="年代" hasFeedback >
            {getFieldDecorator('issueYear', {
              initialValue: '',
              rules: [
                { required: false, type: 'string', message: '请选择视频分类' },
                {
                  validator: this.checkYear.bind(this),
                }],
            })(
              <Input placeholder="请输入年份" />
            )}
          </FormItem>
            <FormItem {...formItemLayout} label="演员名" hasFeedback help={isFieldValidating('actorName') ? 'validating...' : (getFieldError('actorName') || []).join(', ')}>
            {getFieldDecorator('actorName', {
              initialValue: '',
              rules: [
                { required: false, min: 1, max: 30, message: '请输入正确的演员名' },
              ],
            })(
              <Input placeholder="请输入演员名" />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="导演名" hasFeedback help={isFieldValidating('directorName') ? 'validating...' : (getFieldError('directorName') || []).join(', ')}>
            {getFieldDecorator('directorName', {
              initialValue: '',
              rules: [
                { required: false, min: 1, max: 30, message: '请输入正确的导演名' },
              ],
            })(
              <Input placeholder="请输入导演名" />
            )}
          </FormItem>
        </Form>
      </Modal>
      </div>
    );
  }
}

export default VideoForm = Form.create({})(VideoForm);

