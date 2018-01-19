import React, { Component } from 'react';
import { browserHistory } from 'react-router';

import { Form, Input, Icon, Button, Spin } from 'antd';
import styles from './index.less';

const FormItem = Form.Item;

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        localStorage.setItem('token', values.password);
        browserHistory.push('/');
        // this.setState({ loading: true })
      } else {
        console.log('请输入用户名或密码!');
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div className={styles.container}>
        <Spin spinning={this.state.loading}>
          <div className={styles.formContent}>
            <h1>考研排名共享系统 - 后台管理</h1>
            <Form onSubmit={this.handleSubmit} className={styles['login-form']}>
              <FormItem>
                {getFieldDecorator('userName', {
                  rules: [{ required: true, message: 'Please input your username!' }],
                })(
                  <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: 'Please input your Password!' }],
                })(
                  <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                )}
              </FormItem>
              <FormItem>
                <Button type="primary" htmlType="submit" className="login-form-button">登录</Button>
              </FormItem>
            </Form>
          </div>
        </Spin>
      </div>
    );
  }
}

export default Form.create()(Login);
