import React from 'react';
import { Spin, Icon } from 'antd';
import { connect } from 'react-redux';
import VideoDetail from '../components/VideoDetail';
import EpisodeInfo from '../components/EpisodeInfo';
import ThemeDetail from '../components/ThemeDetail';
import EntertainmentInfo from '../components/EntertainmentInfo';

import FilterSection from '../components/FilterSection';

@connect((store) => {
  return {
    detail: store.detail,
    theme: store.theme,
  };
})

export default class DetailPage extends React.Component {
  render() {
    const dataArr = this.props.detail.data || [];
    const { fetching } = this.props.detail;
    const { themes, filter, loading, themeAttrList, themeTypeList, filterArr } = this.props.theme;
    const { videoTypeId } = this.props.params || 1;
    const { videoSetId } = this.props.params;
    const detailHeaderArr = dataArr.map((ele) => {
      const data = ele;
      if (videoTypeId === '1') {
        return <div key={ele.createTime}><VideoDetail data={data} /><hr /></div>;
      } else if (videoTypeId === '2') {
        return <div key={ele.createTime}><EpisodeInfo data={data} /><hr /></div>;
      } else if (videoTypeId === '3') {
        return <div key={ele.createTime}><EntertainmentInfo data={data} /><hr /></div>;
      }
    }) || '暂无信息';


    let detailTheme = null;
    let resultInfo = '';
    if (themes) {
      const videoId = this.props.params.videoId;
      let filterTheme = themes.filter((theme) => {
        if (theme.title.indexOf(filter) !== -1 || theme.content.indexOf(filter) !== -1) {
          return true;
        }
        return false;
      });

      if (Array.isArray(filterArr)) {
        filterTheme = filterTheme.filter((theme) => {
          const key = theme.tag;
          if (filterArr.includes(key)) {
            return true;
          }
          return false;
        });
      }

      const total = themes.length;
      const showNum = filterTheme.length;
      if (filterTheme.length === 0) {
        detailTheme = <div style={{ textAlign: 'center' }}><Icon type="frown-o" style={{ padding: '10px 0px', fontSize: '20px', lineHeight: '26px' }} /> 筛选{total}个主题，沒有找到相关主题<hr /></div>;
      } else {
        detailTheme = filterTheme.map((theme, i) => {
          return <ThemeDetail themeTypeList={themeTypeList} data={theme} key={i} videoId={videoId} videoSetId={videoSetId} />;
        });
        if (filter) {
          resultInfo = <div>从{total}条主题中找到{showNum}条相关信息,命中率{parseInt(showNum / total * 100, 10)}%.</div>;
        }
      }
    }

    return (
      <div>
        <Spin tip="视频信息加载中..." spinning={fetching} size="large">
          <div className="container" style={{ marginTop: '25px', width: '1100px', maxWidth: '100%', minHeight: '200px' }}>
            {detailHeaderArr}
          </div>
        </Spin>
        <Spin tip="主题列表加载中..." spinning={loading} size="large">
          <div className="container" style={{ marginTop: '15px', width: '1100px', maxWidth: '100%', minHeight: '200px' }}>
            <FilterSection dispatch={this.props.dispatch.bind(this)} videoTypeId={videoTypeId} themeTypeList={themeTypeList} themeAttrList={themeAttrList} />
            {resultInfo}
            {detailTheme}
          </div>
        </Spin>
      </div>
    );
  }
}
