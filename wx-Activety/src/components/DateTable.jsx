import React from 'react';
import { Row, Pagination } from 'antd';
import { VoteCard } from './VoteCard.jsx'

export class DataTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { current: 1 };
  }

  onPageChange(page) {
    this.setState({
      current: page,
    })
  }

  render() {
    const { dataArr, pageSize, filter } = this.props || [];
    const current = this.state.current;
    let data = [];
    if (filter) {
      data = dataArr.filter((item) => {
        return item.title.toLowerCase().indexOf(filter.toLowerCase()) !== -1
      })
    } else {
      data = dataArr;
    } 
    var voteCards = [];
    if(data.length != 0){
        const pages = data.reduce((page, ele, i) => {
          const pageNum = parseInt(i / pageSize);
          page[pageNum] = page[pageNum] || [];
          page[pageNum] = page[pageNum].concat(ele);
          return page
        }, []);
        voteCards = pages[current - 1].map((ele,i) => <VoteCard data={ele} key={i} dispatch={this.props.dispatch} />)
    }else{
      voteCards = <div style={{ margin: '0 auto', fontWeight:'bold'}}>没有搜索到相关的结果</div>
    }
    return (
        <div>
            <Row type="flex" style={{ marginBottom: '15px' }}>{voteCards}</Row>
            <Pagination current={this.state.current}
              pageSize={pageSize} onChange={this.onPageChange.bind(this)} total={data.length}
              style={{ marginTop: '15px' }}
            />
        </div>
    )
  }
}

