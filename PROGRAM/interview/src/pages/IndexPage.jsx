import React from 'react';
import { Table, Button, Checkbox } from 'antd';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { getGoods, changeCount, checkOut, addCount, subtractCount } from '../actions/goodsActions';

@connect((store) => {
  return {
    goods: store.goods,
  };
})
export default class IndexPage extends React.Component {
  componentWillMount() {
    this.props.dispatch(getGoods());
  }
  checkout() {
    this.props.dispatch(checkOut());
  }
  count(record, e) {
    if (e.target.value.length === 1) {
      record.quantity = e.target.value.replace(/[^1-9]/g, '');
    } else {
      record.quantity = e.target.value.replace(/\D/g, '');
    }
    this.props.dispatch(changeCount(this));
  }
  add(record) {
    this.props.dispatch(addCount(record.key));
  }
  subtract(record) {
    this.props.dispatch(subtractCount(record.key));
  }
  Check(record, e) {
    const ss = e.target.checked;
    record.check = ss;
    this.props.dispatch(changeCount(this));
  }

  render() {
    const { goods } = this.props;
    let data = '';
    if (goods.goodsList) {
      data = goods.goodsList;
    } else {
      data = null;
    }
    const btn = { position: 'absolute', right: 0 };

    const columns = [{
      title: 'Goods',
      dataIndex: 'goods',
      key: 'goods',
    }, {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    }, {
      title: 'Quantity',
      key: 'quantity',
      render: (text, record) => (
        <span>
          <Button style={{ marginRight: '5px', padding: '1px 6px' }} onClick={this.subtract.bind(this, record)}>-</Button>
          <input style={{ width: '60px', textAlign: 'center' }} ref="quantitys" value={record.quantity} onChange={this.count.bind(this, record)} />
          <Button style={{ marginLeft: '5px', padding: '1px 5px' }} onClick={this.add.bind(this, record)}>+</Button>
        </span>
      ),
    }, {
      title: 'Add To Cart',
      key: 'check',
      render: (text, record) => (
        <Checkbox checked={record.check} onClick={this.Check.bind(this, record)} />
      ),
    }];
    return (
      <div style={{ position: 'relative' }}>
        <h1 style={{ marginTop: '15px', marginBottom: '15px' }}>Goods List</h1>
        <Table columns={columns} dataSource={data} />
        <Link to={'/billingPage'}>
          <Button style={btn} type="primary" size="large" onClick={this.checkout.bind(this)}>checkout</Button>
        </Link>
      </div>
    );
  }
};