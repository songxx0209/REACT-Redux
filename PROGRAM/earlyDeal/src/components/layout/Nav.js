import React from 'react';
import { connect } from 'react-redux';
import { IndexLink } from 'react-router';
import { fetchStarTable, fetchTable } from '../../actions/tableActions';


@connect((store) => {
  return {
    table: store.table,
  };
})
export default class Nav extends React.Component {
  constructor() {
    super();
    this.state = {
      collapsed: true,
    };
  }
  toggleCollapse() {
    const { isStar } = this.props.table;
    const collapsed = !this.state.collapsed;
    this.setState({ collapsed });
    if (isStar) {
      this.props.dispatch(fetchStarTable(''));
    } else {
      this.props.dispatch(fetchTable(0, ''));
    }
  }
  render() {
    const { location } = this.props;
    const { collapsed } = this.state;
    const homeClass = location.pathname === '/' ? 'active' : '';
    const navClass = collapsed ? 'collapse' : '';

    return (
            <nav className="navbar navbar-default navbar-fixed-top" role="navgation">
                <div className="container">
                    <div className="navbar-header">
                        <button className="navbar-toggle" type="button" onClick={this.toggleCollapse.bind(this)}>
                            <span className="icon-bar" />
                            <span className="icon-bar" />
                            <span className="icon-bar" />
                        </button>
                    </div>

                    <div className={`navbar-collapse ${navClass}`} id="navbar-main">
                        <ul className="nav navbar-nav">
                            <li className="{homeClass}">
                                <IndexLink to="/" onClick={this.toggleCollapse.bind(this)}> 主页 </IndexLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
    );
  }
}


// <li className="{featuredClass}">
// 								<Link to="featured" onClick={this.toggleCollapse.bind(this)}> Featured </Link>
// 							</li>
// 							<li className="{archivesClass}">
// 								<Link to="archives" onClick={this.toggleCollapse.bind(this)}> Archives </Link>
// 							</li>

