import React from 'react';
import { connect } from 'react-redux';
import { fetchDetail, clearDetail } from '../actions/detailActions';
import { fetchTheme, clearTheme } from '../actions/themeActions';

@connect((store) => {
  return {
    detail: store.detail,
  };
})

export default class DetailLayout extends React.Component {
  componentWillMount() {
    const { videoId, videoTypeId, videoSetId } = this.props.params;

    this.props.dispatch(fetchDetail(videoId, videoTypeId, videoSetId));
    this.props.dispatch(fetchTheme(videoId, videoTypeId, videoSetId));
  }

  componentWillUnmount() {
    this.props.dispatch(clearDetail());
    this.props.dispatch(clearTheme());
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}
