import React from 'react';
import { Select } from 'antd';
import Search from '../components/SearchInput';
import AddVideoForm from '../components/AddVideoForm';
import AddStarForm from '../components/AddStarForm';

const Option = Select.Option;
const OptGroup = Select.OptGroup;

export default class TopBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: '0',
    };
  }


  selectChange(value) {
    this.setState({
      selected: value,
    });
  }

  render() {
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
              <Select onChange={this.selectChange.bind(this)} size="large" style={{ width: '100%', marginBottom: '15px' }} placeholder="视频分类" defaultValue="0">
                <OptGroup label="影片类">
                  <Option value="0">全部（影片）</Option>
                  <Option value="1">电影</Option>
                  <Option value="2">电视剧</Option>
                  <Option value="3">综艺</Option>
                </OptGroup>
                <OptGroup label="明星类">
                  <Option value="star">全部（明星）</Option>
                </OptGroup>
              </Select>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-5 col-xs-12 col-lg-offset-2 col-md-offset-2" style={{ marginBottom: '15px' }}>
              <Search dispatch={this.props.dispatch} selected={this.state.selected} />
            </div>
            <div className="col-lg-3 col-md-3 col-sm-4 col-xs-12">
              <AddStarForm />
              <AddVideoForm />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
