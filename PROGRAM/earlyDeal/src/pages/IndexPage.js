import React from 'react';
import { connect } from 'react-redux';
import { Spin } from 'antd';
import SearchHeader from '../components/SearchHeader';
import SearchResultBox from '../components/SearchResultBox';
import { fetchStarTable } from '../actions/tableActions';

@connect((store) => {
  return {
    table: store.table,
  };
})

export default class IndexPage extends React.Component {
  componentDidMount() {
    const { starName } = this.props.location.query;
    if (starName) {
      this.props.dispatch(fetchStarTable(starName));
    }
  }
  render() {
    const { items, starItems, filter, fetching, isStar } = this.props.table;
    let data = [];
    if (isStar) {
      data = starItems;
    } else {
      data = items;
    }
    return (
      <div>
        <SearchHeader dispatch={this.props.dispatch} />
        <Spin tip="Loading..." spinning={fetching} size="large">
          <SearchResultBox items={data} filter={filter} pageSize={52} isStar={isStar} />
        </Spin>
      </div>
    );
  }
}
