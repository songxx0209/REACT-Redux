import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Steps, Button } from 'antd';

import styles from './index.less';
import Province from '../../components/province';
import University from '../../components/university';
import College from '../../components/college';
import Major from '../../components/major';
import Examinee from '../../components/examinee';
import Loading from '../../components/common/loading';

const Step = Steps.Step;

class IndexPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
    };
  }
  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }
  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }

  render() {
    const { current } = this.state;
    const steps = [{
      title: '省份',
      content: <Province next={this.next.bind(this)} />,
    }, {
      title: '学校',
      content: <University next={this.next.bind(this)} />,
    }, {
      title: '学院',
      content: <College next={this.next.bind(this)} />,
    }, {
      title: '专业',
      content: <Major next={this.next.bind(this)} />,
    }
    // , {
    //   title: '考生',
    //   content: <Examinee next={this.next.bind(this)} />,
    // }
    ];

    let currentDisplay = null;
    for (let i = 0; i < steps.length; i++) {
      if (this.state.current === i) {
        currentDisplay = steps[i].content;
      }
    }


    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <p>全国考研共享排名系统 - 后台管理</p>
        </div>

        <div className={styles.content}>
          <Steps current={current}>
            {steps.map(item => <Step key={item.title} title={item.title} />)}
          </Steps>
          <div className="steps-content">{ currentDisplay }</div>
          <div className="steps-action">
            {/* {
              this.state.current < steps.length - 1 && this.state.current !== 0
              &&
              <Button type="primary" onClick={() => this.next()}>Next</Button>
            } */}
            {/* {
              this.state.current === steps.length - 1
              &&
              <Button type="primary" onClick={() => message.success('Processing complete!')}>Done</Button>
            } */}
            {
              this.state.current > 0
              &&
              <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>上一级</Button>
            }
          </div>
        </div>

        <div className={styles.footer}></div>
        
      </div>
    );
  }
}

const mapStateToProps = (state) => {

  return {};
};

const mapDispatchToProps = ({
  // getData,
});

export default Loading(connect(
  mapStateToProps,
  mapDispatchToProps,
)(IndexPage));
