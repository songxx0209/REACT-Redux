import React, { Component } from 'react';
// import { dispatch } from 'redux';
import { connect } from 'react-redux';

import { Button, Layout, Row, Col, Select } from 'antd';

import { getData } from 'actions/testAction';
import styles from './index.less';

const { Header, Footer, Content } = Layout;
const Option = Select.Option;

class IndexPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: 0,
    };
  }
  componentWillMount() {
    this.props.getData();
  }
  componentDidMount() {
    // console.log('did mount');
  }
  // shouldComponentUpdate() {
  //   console.log('should');
  //   return false;
  // }

  get SelectArtile() {
    const { data } = this.props;
    const lists = this.props.data.get('list');

    if (lists.length === 0) {
      return <span />;
    }

    const crticleList = lists.map((list, i) => {
      return (
        <Option key={i} value={`${i}`}>{list.title}</Option>
      );
    });

    return (
      <Select
        showSearch
        style={{ width: 200 }}
        placeholder="Select a person"
        optionFilterProp="children"
        onChange={this.handleChange}
        defaultValue={'0'}
      >
        {crticleList}
      </Select>
    );
  }

  handleChange = (key) => {
    this.setState({
      key,
    });
  }

  render() {
    const { data } = this.props;
    const lists = this.props.data.get('list');
    const { key } = this.state;
    let articleContent = '';
    if (lists.length === 0) {
      articleContent = <p />;
    } else {
      articleContent = <p className={styles['article-content']} dangerouslySetInnerHTML={{ __html: lists[key].content }} />;
    }
    
    return (
      <Layout className={styles.container}>
        <Header className={styles.header}>
          <Row className={styles['header-top']}>
            <Col span={12}>
              <span className={styles['content-f-size']}>songxx's blog</span>
            </Col>
            <Col span={12} className={styles['header-top-right']}>
              <span className={styles['content-f-size']}>登录</span>
              <span className={styles['content-f-size']}>注册</span>
              {this.SelectArtile}
            </Col>
          </Row>
          <div className={styles['header-description']}>
            <h1>songxx's blog</h1>
            <p style={{ fontSize: '14px' }}>在这个喧嚣的世界，我只想静看你装逼！</p>
          </div>
        </Header>

        <Content className={styles.content}>
          <div className={styles.article}>
            {articleContent}
          </div>
        </Content>

        <div className={styles.footer}>
          <p className={styles['discuss-title']}>留言：</p>

          <div className={styles.discussItem}>
            <p className={styles.discusser}><strong>zhangxiaowei</strong> 说：</p>
            <p className={styles.discussContent}>to talk about something with another person or a group in order to exchange ideas or decide something</p>
          </div>

          <div className={styles.myOpinion}>
            <p className={styles.opinionTitle}>我要发表看法：</p>

            <p className={styles.opinionSubTitle}>您的留言</p>
            <p className={styles.opinionText}>
              <textarea cols="30" rows="10" />
            </p>

            <p className={styles.opinionSubTitle}>您的大名：</p>
            <p><input id="comment-author" name="author" size="30" value="" />  <span className={styles.hint}> «-必填</span></p>

            <p>
              <button className={styles.opinionBtn}>发表</button>
              <span className={styles.hint}> «- 点击按钮</span>
            </p>
            
          </div>
        </div>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => {
  console.log('state==', state);
  return { data: state.articleList };
};

const mapDispatchToProps = ({
  getData,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(IndexPage);
