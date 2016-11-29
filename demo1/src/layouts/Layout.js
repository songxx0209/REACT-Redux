import React from 'react';
import { connect } from 'react-redux';
import { fetchVoteData } from '../actions/voteActions'
import Nav from '../components/layout/Nav';
import Footer from '../components/layout/Footer';
import styles from './layout.less';

@connect((store) => {
  return {
    content: store.voteData.content,
  };
})


export default class Layout extends React.Component {

  componentWillMount() {
    this.props.dispatch(fetchVoteData());
  }
  render() {
    const { user } = this.props;
    const { location } = this.props;
    const containerStyle = {
      paddingTop: '60px',
      maxWidth: '1366px',
    };

    return (
      <div>
        <Nav location={location} />
        <div className="container" style={containerStyle}>
          <div className="row">
            <div className="col-lg-12">
              {this.props.children}
            </div>
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}

