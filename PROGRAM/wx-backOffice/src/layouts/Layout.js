import React from 'react';
import Nav from '../components/layout/Nav';
import Footer from '../components/layout/Footer';
import styles from './layout.less';

export default class Layout extends React.Component {

  render() {
    const { user } = this.props;
    const { location } = this.props;
    const containerStyle = {
      paddingTop: '60px',
      maxWidth: '90%',
      width: '90%',
    };

    return (
      <div>
        <Nav location={location} />
        <div className="container" style={containerStyle}>
          {this.props.children}
          <Footer />
        </div>
      </div>
    );
  }
}

