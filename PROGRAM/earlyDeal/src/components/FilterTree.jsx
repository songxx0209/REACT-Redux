import React from 'react';
import { Col, Tree } from 'antd';
import { checkTheme } from '../actions/themeActions';

const TreeNode = Tree.TreeNode;
export default class FilterCheckBox extends React.Component {
  constructor(props) {
    super(props);
    const keys = ['0'];
    this.state = {
      defaultExpandedKeys: keys,
      defaultSelectedKeys: keys,
      defaultCheckedKeys: keys,
    };
  }
  onCheck(info) {
    // console.log(info)
    this.props.dispatch(checkTheme(info));
  }

  render() {
    const defaultExpandAll = true;
    const { themeTypeList } = this.props;
    let rootNodes = [];
    // let checkedList = [];
    if (themeTypeList.length > 0) {
      rootNodes = themeTypeList.map((item) => {
        item.attrArr = item.attrArr || [];
        let childNodes = [];
        if (item && item.attrArr) {
          childNodes = item.attrArr.map((ele) => {
            return (<TreeNode className={'check_list_li'} title={<span style={{ float: 'left' }}>{ele.attrTypeName}</span>} key={`0-${item.themeTypeId}-${ele.attrTypeId}`} />);
          });
        }
        return (
          <TreeNode title={item.themeTypeName} key={`0-${item.themeTypeId}`} className={'check_list_ul'}>
                {childNodes}
          </TreeNode>
        );
      });
    }

    return (
        <Col>
            <Tree className="myCls" checkable showLine
              defaultSelectedKeys={this.state.defaultSelectedKeys}
              defaultCheckedKeys={this.state.defaultCheckedKeys}
              defaultExpandAll={defaultExpandAll}
              onCheck={this.onCheck.bind(this)}
            >
                <TreeNode title={'所有类别'} key={'0'}>
                  {rootNodes}
                </TreeNode>
            </Tree>
        </Col>
    );
  }

}

