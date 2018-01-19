import React from 'react';
import { Button, Modal, Form, Input, Radio, DatePicker } from 'antd';
const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;
import moment from 'moment'
import { addActivity, updateActivity, activeModalShow, changeEditor, setCacheFormValue } from '../actions/activeActions.js'
import FirstEditor from './FirstEditor';

class FirstTableModal extends React.Component {

  cancel() {
    this.props.dispatch(activeModalShow(false));
  }

  save(e) {
    //e.preventDefault();
    const form = this.props.form;
    form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }
      const rangeTimeValue = fieldsValue['Time'];
      const values = {
        ...fieldsValue,
        'Time': [
          rangeTimeValue[0].format('YYYY-MM-DD HH:mm:ss'),
          rangeTimeValue[1].format('YYYY-MM-DD HH:mm:ss'),
        ],
      };
    const htmlstr = window.firstEditor.getHTML();
    //console.log('Received values of form: ', values);
    
    if(this.props.listData.keepfrom.id){//点击编辑
      let mark = null;
      if(values.modifier === '下架'){
        mark = '3'
      } else if(values.modifier === '上架'){
        mark = '1'
      } else if(values.modifier === '未上架'){
        mark = '2'
      }
      this.props.dispatch(updateActivity(values.title, this.props.listData.keepfrom.id, htmlstr, values.rule, values.Time[0], values.Time[1], mark));
    } 
    else{//点击添加
      this.props.dispatch(addActivity(values.title, htmlstr, values.rule, values.Time[0], values.Time[1]));
    }
    this.props.dispatch(activeModalShow(false));
    });
  }

  changeFrom(){
    //if(this.props.listData.keepfrom.id){//点击编辑
      const { form } = this.props;
      form.validateFields((err, fieldsValue) => {
        if (err) {
          return;
        }
        const rangeTimeValue = fieldsValue['Time'];
        const values = {
          ...fieldsValue,
          'Time': [
            rangeTimeValue[0].format('YYYY-MM-DD HH:mm:ss'),
            rangeTimeValue[1].format('YYYY-MM-DD HH:mm:ss'),
          ],
          'title':' ',
          'rule': ' ',
        };
        let content = window.firstEditor.getHTML();
        let mark = null;
        if(values.modifier === '下架'){
          mark = '3'
        } else if(values.modifier === '上架'){
          mark = '1'
        } else if(values.modifier === '未上架'){
          mark = '2'
        }
        //console.log('Received values of form: ', values);
        //this.props.dispatch(changeEditor(values.title, values.Time[0], values.Time[1], mark, values.rule, content)); 
      })
    //}
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
    let radio = null;
    if(this.props.listData.keepfrom.id){//点击编辑
      radio = <FormItem 
                label="是否上架" 
                className="collection-create-form_last-form-item" hasFeedback>
                {getFieldDecorator('modifier', {
                  initialValue: '下架',
                })(
                  <Radio.Group>
                    <Radio value="上架">上架</Radio>
                    <Radio value="下架">下架</Radio>
                    <Radio value="未上架">未上架</Radio>
                  </Radio.Group>
                )}
              </FormItem>
    } 
    else{//点击添加
      radio = <FormItem 
                label="是否上架" 
                className="collection-create-form_last-form-item" hasFeedback>
                {getFieldDecorator('modifier', {
                  initialValue: '下架',
                })(
                  <Radio.Group disabled>
                    <Radio value="上架">上架</Radio>
                    <Radio value="下架">下架</Radio>
                    <Radio value="未上架">未上架</Radio>
                  </Radio.Group>
                )}
              </FormItem>
    }
/*onChange={this.changeFrom.bind(this)*/
    return (
      <Modal
        visible={this.props.listData.modalShow}
        title="Create a new collection"
        okText="Create"
        width={800}
        onCancel={this.cancel.bind(this)}
        onOk={this.save.bind(this)}
      >
        <Form vertical>
          <FormItem  label="标题" hasFeedback>
            {getFieldDecorator('title', {
              rules: [{ required: true, message: 'Please input the title of collection!' }],
            })(
              <Input />
            )}
          </FormItem>

          <FormItem label="开始结束时间" hasFeedback>
          {getFieldDecorator('Time', rangeConfig)(
              <RangePicker showTime format="YYYY-MM-DD HH:mm:ss" />
            )}
          </FormItem>

          {radio}

          <FormItem  label="活动规则" hasFeedback>
            {getFieldDecorator('rule', {
              rules: [{ required: true, message: 'Please input the title of collection!' }],
            })(
              <Input type="textarea" autosize={true} autosize={{ minRows: 5 }} />
            )}
          </FormItem>
          <FirstEditor content={this.props.listData.keepfrom.content} />
        </Form>
      </Modal>
    );
  }
};

export default FirstTableModal = Form.create(
  {
    onFieldsChange(props, fields) {
      props.dispatch(setCacheFormValue(fields));
    },
    mapPropsToFields(props) {
      console.log('xiaowei-dou', props.listData.keepfrom);
      if (props.listData.keepfrom.id) {//点击编辑
        let display = null;
        if(props.listData.keepfrom.mark == '1'){
          display = '上架'
        }else if(props.listData.keepfrom.mark == '3'){
          display = '下架'
        }else if(props.listData.keepfrom.mark == '2'){
          display = '未上架'
        }
        return {
          title: {value:''},
          Time: { value: [moment(props.listData.keepfrom.startTime), moment(props.listData.keepfrom.endTime)]},
          modifier: { value: display },
          rule: {value: props.listData.keepfrom.rule}
        };
      } else{//点击添加显示为空
        return {
          title: { value: ' ' },
          Time: {value: [moment(), moment()]},
          modifier: { value: '未上架' },
          rule: {value: ' '}
        }
      }
    }
  }
)(FirstTableModal);