import React from 'react';
import { searchFilter } from '../actions/voteActions';
import { Input } from 'antd';

export default class Search extends React.Component {

  search(e) {
    const selectWord = e.target.value;
    this.props.dispatch(searchFilter(selectWord));
  }

  render(){
    return (
      <Input size="default" placeholder="输入作品名！" onChange={ this.search.bind(this) } />
    )
  }
}

