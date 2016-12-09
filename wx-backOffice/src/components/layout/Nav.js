import React from 'react';
import { IndexLink, Link } from 'react-router';

export default class Nav extends React.Component {
	  constructor() {
		  super()
		  this.state = {
			  collapsed: true,
		};
	}
	  toggleCollapse() {
		  const collapsed = !this.state.collapsed;
		  this.setState({ collapsed });
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
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
						</button>
					</div>

					<div className={'navbar-collapse ' + navClass} id="navbar-main">
						<ul className="nav navbar-nav">
							<li className="{homeClass}">
								<IndexLink to="/" onClick={this.toggleCollapse.bind(this)}> 微信投票管理平台 </IndexLink>
							</li>
							<li style={{ display: location.pathname.indexOf('zuoPinPage') !== -1 ? 'block' : 'none' }}>
								<a href='javascript:void(0)'> >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;作品管理 </a>
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

