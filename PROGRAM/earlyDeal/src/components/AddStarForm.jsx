import React from 'react';
import { connect } from 'react-redux';
import { Modal, Form, Input, Button } from 'antd';
import { addStar, starModalClose, starModalOpen } from '../actions/addAcions';

const FormItem = Form.Item;

@connect((store) => {
  return {
    add: store.add,
  };
})

class StarForm extends React.Component {
  handleOk() {
    this.props.form.validateFields((errors, values) => {
      if (errors) {
        return;
      }
      this.props.dispatch(addStar(values));
    });
  }
  showStarModal() {
    this.props.form.resetFields();
    this.props.dispatch(starModalOpen());
  }
  handleCancel() {
    this.props.dispatch(starModalClose());
  }

  render() {
    const { getFieldDecorator, getFieldError, isFieldValidating } = this.props.form;
    const { starFetching, sModalShow } = this.props.add;
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 16 },
    };

    return (
      <div>
      <Button type="primary" size="large" onClick={this.showStarModal.bind(this)} style={{ float: 'right' }}>添加明星</Button>
      <Modal title="添加明星" visible={sModalShow} width={600} confirmLoading={starFetching} onOk={this.handleOk.bind(this)} onCancel={this.handleCancel.bind(this)} >
        <Form horizontal>
          <FormItem {...formItemLayout} label="姓名" hasFeedback help={isFieldValidating('starName') ? 'validating...' : (getFieldError('starName') || []).join(', ')}>
            {getFieldDecorator('starName', {
              rules: [
                { required: true, min: 1, max: 30, message: '请输入正确的演员名字' },
              ],
            })(
              <Input placeholder="请输入演员名字" />
            )}
          </FormItem>
        </Form>
      </Modal>
      </div>
    );
  }
}

export default StarForm = Form.create({})(StarForm);
