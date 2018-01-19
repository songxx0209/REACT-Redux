import React from 'react';
import { connect } from 'react-redux';
import { Spin } from 'antd';

@connect((store) => {
  return {
    theme: store.theme,
  };
})

export default class ThemePage extends React.Component {
  render() {
    const { themes, loading } = this.props.theme;
    let content = null;
    if (themes) {
      const themeId = this.props.params.themeId;
      const theme = themes.reduce((theme, ele, index, arr) => {
        if (ele.id == themeId) {
          theme = ele;
        }
        return theme;
      }, {});
      content = <div><h3>{theme.title}</h3><hr /><p style={{ marginBottom: '20px' }}><span style={{ paddingRight: '30px' }}>{theme.issueTime}</span><span>{theme.source}</span></p><div dangerouslySetInnerHTML={{ __html: theme.content }} /></div>;
    }
    return (
      <Spin tip="Loading..." spinning={ loading } size="large">
        <div className="container" style={{ minHeight: '250px' }}>
          {content}
        </div>
      </Spin>
    );
  }
}
