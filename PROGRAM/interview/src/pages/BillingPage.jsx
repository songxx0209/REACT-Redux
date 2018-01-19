import React from 'react';
import { connect } from 'react-redux';
import { Table, Button } from 'antd';
import { Link } from 'react-router';

@connect((store) => {
  return {
    goodsList: store.goods.salesList,
  };
})
export default class BillingPage extends React.Component {
  render() {
    const columns = [{
      title: 'Goods',
      dataIndex: 'goods',
      key: 'goods',
    }, {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    }, {
      title: 'OriginalPrice',
      dataIndex: 'price',
      key: 'price',
    }, {
      title: 'Tax',
      dataIndex: 'tax',
      key: 'tax',
    }, {
      title: 'sellingPrice',
      dataIndex: 'sellingPrice',
      key: 'sellingPrice',
    }];
    const statistics = { border: '1px solid black', padding: '20px', width: '40%', textAlign: 'center', position: 'relative', left: '60%' };
    const btn = { float: 'right', clear: 'both' };

    const { goodsList } = this.props;
    const allSale = [0, 0];// 最终税收总和，商品总价（+税）
    let Goods = null;
    if (goodsList) {
      Goods = goodsList.map((ele) => { // 加入购物车的商品列表
        ele.sellingPrice = Math.round(ele.sellingPrice * 100) / 100;
        allSale[0] += ele.sellingPrice;
        allSale[1] += (ele.tax - 0);
        ele.tax = ele.tax.toFixed(2);
        return ele;
      });
      allSale[0] = allSale[0].toFixed(2);
      allSale[1] = allSale[1].toFixed(2);
    }
    return (
			<div style={{ position: 'relative' }}>
        <h1 style={{ marginTop: '15px', marginBottom: '15px' }}>Shopping Cart</h1>
				<Table columns={columns} dataSource={Goods} />
				<div style={statistics}>Sales Taxes : <span style={{ color: 'red' }}>{allSale[1]}</span>, Total : <span style={{ color: 'red' }}>{allSale[0]}</span></div>
        <div style={{ marginTop: '10px' }}>
          <Link to={''}>
            <Button style={btn} type="primary" size="large">back Goods</Button>
          </Link>
        </div>
			</div>
		);
  }
}
