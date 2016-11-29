import React from 'react';
import { Button, Modal, Form, Input, Radio, DatePicker } from 'antd';
const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;
import moment from 'moment'
import { firstModalShow } from "../actions/modalAction";
import { addActivity,initFirstForm } from '../actions/voteActions.js'


class FirstTableModal extends React.Component {
  constructor(props){
    super(props)
    this.state = {
    }
  }

  cancel() {
    this.props.dispatch(firstModalShow(false));
  }

  save(e) {
    //e.preventDefault();
    const form = this.props.form;
    form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }
      form.resetFields();
      const rangeTimeValue = fieldsValue['rangeTimePicker'];
      const values = {
        ...fieldsValue,
        'rangeTimePicker': [
          rangeTimeValue[0].format('YYYY-MM-DD'),
          rangeTimeValue[1].format('YYYY-MM-DD'),
        ],
      };
    console.log('Received values of form: ', values);
    this.props.dispatch(firstModalShow(false));
    });
  }

  render(){

    const { getFieldDecorator, getFieldError, isFieldValidating, setFieldsValue } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 18 },
    };
    const rangeConfig = {
      rules: [{ type: 'array', required: true, message: 'Please select time!' }],
    };
    return (
      <Modal
        visible={this.props.IsModal.firstShow}
        title="Create a new collection"
        okText="Create"
        onCancel={this.cancel.bind(this)}
        onOk={this.save.bind(this)}
      >
        <Form vertical>
          <FormItem  label="标题">
            {getFieldDecorator('title', {
              rules: [{ required: true, message: 'Please input the title of collection!' }],
            })(
              <Input />
            )}
          </FormItem>

          <FormItem label="开始结束时间">
          {getFieldDecorator('rangeTimePicker', rangeConfig)(
              <RangePicker showTime format="YYYY-MM-DD" />
            )}
          </FormItem>

          <FormItem 
            label="是否上架" 
            className="collection-create-form_last-form-item">
            {getFieldDecorator('modifier', {
              initialValue: '下架',
            })(
              <Radio.Group>
                <Radio value="上架">上架</Radio>
                <Radio value="下架">下架</Radio>
              </Radio.Group>
            )}
          </FormItem>
        </Form>
      </Modal>
    );
  }
};

export default FirstTableModal = Form.create(
  {
    mapPropsToFields(props) {
      if (props.IsModal.firstTableForm) {
        console.log(1);
        return {
          title: { value: props.IsModal.firstTableForm.title },
          rangeTimePicker: { value: [moment(props.IsModal.firstTableForm.startTime), moment(props.IsModal.firstTableForm.endTime)]},
          modifier: { value: props.IsModal.firstTableForm.state }
        };
      } else{
        return {
          title: { value: '' },
          rangeTimePicker: [],
          modifier: { value: '下架' }
        }
      }
    }
  }
)(FirstTableModal);