import React from 'react';
import { showModal } from '../actions/postsActions';
import Xeditor from '../components/fuwenben';

import { Modal, Form, Input, Radio, Select } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

class FormModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
  }

  onCancel() {
    this.props.dispatch(showModal(false));
  }

  onCreate() {
    const form = this.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      console.log('Received values of form: ', values);
      form.resetFields();
      this.props.dispatch(showModal(false));
    });
  }

  checkPhone(rule, value, callback) {
    const phoneRe = /^1(3|4|5|7|8)\d{9}$/;
    if (value && phoneRe.test(value) === true) {
      callback();
    } else {
      callback('请输入正确的电话号码！');
    }
  }
  render() {
    const { visible, form } = this.props;
    const { getFieldDecorator } = form;
    // 设置为一行显示,名字占6/24, 输入框占14/24
    const wocao = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    // 手机号码  可以在input标签中加上addonBefore={prefixSelector}, 也可以不加
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '86',
    })(
      <Select className="icp-selector">
        <Option value="86">+86</Option>
        <Option value="0813">0813-</Option>
      </Select>
    );

    return (
	    <Modal
  visible={visible}
  title="Create a new collection"
  okText="Create"
  onCancel={this.onCancel.bind(this)}
  onOk={this.onCreate.bind(this)}
	    >
	      <FormItem
  {...wocao}
  label="E-mail"
  hasFeedback
    >
          {getFieldDecorator('email', {
            rules: [{
              type: 'email', message: 'The input is not valid E-mail!',
            }, {
              required: true, message: 'Please input your E-mail!',
            }],
          })(
            <Input />
          )}
        </FormItem>

        <FormItem
          {...wocao}
          label="Phone Number"
          hasFeedback
        >
          {getFieldDecorator('phone', {
            rules: [
            	{ validator: this.checkPhone.bind(this) },
            ],
          })(
            <Input />
          )}
        </FormItem>


	        <FormItem label="Title" hasFeedback>
	          {getFieldDecorator('title', {
	              rules: [{ required: true, message: 'Please input the title of collection!' }],
	          })(
	            <Input />
	          )}
	        </FormItem>

	        <FormItem label="Description" hasFeedback>
	          {getFieldDecorator('description', {
	              rules: [{ required: true, message: 'Please input the title of collection!' }],
	          })(
	          	<Input type="textarea" />
	          )}
	        </FormItem>

	        <FormItem className="collection-create-form_last-form-item" hasFeedback>
	          {getFieldDecorator('modifier', {
	              initialValue: 'public',
	          })(
	            <Radio.Group>
	              <Radio value="public">Public</Radio>
	              <Radio value="private">Private</Radio>
	            </Radio.Group>
	          )}
	        </FormItem>
	        <Xeditor />

	    </Modal>
	  );
	  }
}

export default Form.create({})(FormModal);
