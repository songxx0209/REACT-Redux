import React from 'react';
import { Link } from 'react-router';
import { Form, Icon, Input, Button, Checkbox, Row, Col } from 'antd';
const FormItem = Form.Item;

class LoginPage extends React.Component {
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
       if (!err) {
        console.log('Received values of form: ', values);
      }
     });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
        <Row type="flex" justify="space-around" align="middle">
        <Col span={6}>

      <Form onSubmit={this.handleSubmit.bind(this)} className="login-form" style={{ maxWidth: '450px', marginTop: '50%' }}>
        <FormItem>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input addonBefore={<Icon type="user" />} placeholder="Username" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input addonBefore={<Icon type="lock" />} type="password" placeholder="Password" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>Remember me</Checkbox>
          )}
          <a className="login-form-forgot">Forgot password</a>
          <Link to={"detailPage"}>
            <Button type="primary" htmlType="submit" className="login-form-button" style={{ width: '100%' }} >Log in</Button>
          </Link>
          Or <a>register now!</a>
        </FormItem>
      </Form>

      </Col>
      </Row>
    );
  }
}

export default LoginPage = Form.create()(LoginPage);
