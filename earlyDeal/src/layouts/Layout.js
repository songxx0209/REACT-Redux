import React from 'react';
import { connect } from 'react-redux';
import Nav from '../components/layout/Nav';
import Footer from '../components/layout/Footer';
import './layout.less';
import { fetchTable } from '../actions/tableActions';


@connect((store) => {
  return {
    table: store.table.table,
  };
})

export default class Layout extends React.Component {
  componentWillMount() {
    this.props.dispatch(fetchTable(0, ''));
  }

  render() {
    const { location } = this.props;
    return (
      <div>
        <Nav location={location} />
        <div style={{ paddingTop: '75px' }}>
          {this.props.children}
        </div>
        <Footer />
      </div>
    );
  }
}
