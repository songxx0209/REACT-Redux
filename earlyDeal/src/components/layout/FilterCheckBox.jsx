import React from 'react';
import { Row, Col, Checkbox } from 'antd';
import { checkTheme } from '../actions/themeActions';
import { connect } from 'react-redux';

const CheckboxGroup = Checkbox.Group;

@connect((store) => {
  return {
    filterArr: store.theme.filterArr,
    themeAttrList: store.theme.themeAttrList,
  };
})
export default class FilterCheckBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedList: [],
      indeterminate: true,
      checkAll: true,
    }
  }


  componentDidMount() {
    const checkList = this.props.themeAttrList.map(ele => ele.attrTypeName);
    this.props.dispatch(checkTheme(checkList));
  }


  onChange(checkedList) {
    console.log(checkedList)
    this.setState({
      checkedList,
      indeterminate: !!checkedList.length && (checkedList.length < this.props.checkList.length),
      checkAll: checkedList.length === this.props.checkList.length,
    });
    this.props.dispatch(checkTheme(checkedList));
  }
  onCheckAllChange(e) {
    this.setState({
      checkedList: e.target.checked ? this.props.checkList : [],
      indeterminate: false,
      checkAll: e.target.checked,
    });
    if (e.target.checked) {
      this.props.dispatch(checkTheme(this.props.checkList));
    } else {
      this.props.dispatch(checkTheme([]));
    }
  }

  render() {
    const { checkList, defaultCheckedList, themeTypeName, filterArr } = this.props;
    // const defaultCheckedList = ['Apple', 'Orange'];
    return (
     <Row style={{ padding: '10px 0', borderBottom: '1px solid #ecf0f1' }} >
        <Col>
           <Checkbox
             indeterminate={this.state.indeterminate}
             onChange={this.onCheckAllChange.bind(this)}
             checked={this.state.checkAll}
           >
             {themeTypeName}
          </Checkbox>
       </Col>
       <Col offset={2}>
        <CheckboxGroup options={checkList} value={filterArr} onChange={this.onChange.bind(this)} />
       </Col>
     </Row>
     )
  }

}
