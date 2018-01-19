import React from 'react';
import SearchResult from './SearchResult';
import SearchResultStar from './SearchResultStar';
import { Icon, Pagination, Row, Col } from 'antd';

export default class SearchResultBox extends React.Component {
  constructor() {
    super();
    this.state = {
      current: 1,
    };
  }

  onPageChange(page) {
    this.setState({
      current: page,
    });
  }

  render() {
    const { items, filter, pageSize, isStar } = this.props;
    const starName = this.props.params;
    let data = [];
    let isShow = false;
    if (isStar) {
      if (filter) {
        data = items.filter((item) => {
          return item.name.indexOf(filter) !== -1;
        });
      } else {
        data = items;
      }
    } else if (filter) {
      data = items.filter((item) => {
        return item.title.indexOf(filter) !== -1;
      });
    } else {
      data = items;
    }

    let pageTotal = 0;
    if (data && data.length > 0) {
      pageTotal = data.length;
      const pages = data.reduce((page, ele, i) => {
        const pageNum = parseInt(i / pageSize, 10);
        page[pageNum] = page[pageNum] || [];
        page[pageNum] = page[pageNum].concat(ele);
        return page;
      }, []);
      if (isStar) {
        data = pages[this.state.current - 1].map((item, i) => <SearchResultStar key={i} data={item} />);
      } else {
        if(pages[this.state.current - 1]){
          data = pages[this.state.current - 1].map((item, i) => <SearchResult key={i} data={item} />);
        } else{
          this.state.current = 1;
          data = pages[this.state.current - 1].map((item, i) => <SearchResult key={i} data={item} />);
        }
        
      }

      isShow = true;
    } else {
      data = <div style={{ textAlign: 'center' }}><Icon type="frown-o" style={{ fontSize: '20px' }} /> 当前没有关键字或关键字未能匹配数据<hr /></div>;
      isShow = false;
    }

    return (
      <div>
        <div className="container" style={{ marginTop: '30px' }} >
          {data}
        </div>
        <div className="container">
          <Row type="flex" justify="center" >
           <Col style={{ display: isShow ? 'block' : 'none' }} >
              <Pagination total={pageTotal} pageSize={pageSize} onChange={this.onPageChange.bind(this)} current={this.state.current} />
          </Col>
          </Row>
        </div>

      </div>
    );
  }
}
