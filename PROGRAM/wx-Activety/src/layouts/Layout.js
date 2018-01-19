import React from 'react';
import { connect } from 'react-redux';
import { fetchVoteData, getActiveData, initApp } from '../actions/voteActions.js'

@connect((store) => {
  return {
    voteData: store.voteData,
  };
})

export default class Layout extends React.Component {

  componentDidMount() {
    const sessionId = localStorage.getItem("sessionId")||false;
    if( sessionId ){
      this.props.dispatch(fetchVoteData());
      this.props.dispatch(getActiveData());
    }else{
      this.props.dispatch(initApp(ENV.code));
    }  
  }   

  render() {
    return (
      <div style={{ padding: '10px' }}>
        <div>
          <div className="row">
            <div className="col-lg-12">
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

