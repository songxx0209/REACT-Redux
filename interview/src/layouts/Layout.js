import React from 'react';
import styles from './layout.less';

export default class Layout extends React.Component {
  componentWillMount() {
  }
  render() {
    return (
      <div>
        <div className={styles.layout} >
          {this.props.children}
        </div>
      </div>
    );
  }
}
