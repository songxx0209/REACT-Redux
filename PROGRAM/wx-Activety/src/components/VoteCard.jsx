import React from 'react';
import { connect } from 'react-redux';
import { Col, Card, Button, notification } from 'antd';
import { Link } from 'react-router';
import { castVote } from '../actions/voteActions.js'

@connect((store) => {
  return {
    zuoPinList: store.voteData.zuoPinList,
  };
})
export class VoteCard extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    var odv1 = document.getElementsByClassName('odv1');
    for(var i = 0 ; i < odv1.length ; i ++){
      odv1[i].setAttribute('style','width: 100%;height:'+1.2*odv1[i].offsetWidth+'px;');
    }
  }

  openNotification(val) {
    notification.open({
      message: val,
      description: '',
    });
  }

  castvote(e) {
    const { activeId, optionId, contentType } = this.props.data;
    this.props.dispatch(castVote( activeId, optionId, contentType ));
  }
  
  render() {
    const ImgFullDiv = {
      width:'100%',
      height:'100%', 
      borderRadius: '4px'
    }
    const ShowNameVote = {
      width:'100%', 
      height:'25px', 
      marginTop: '5px'
    }
    const ShowName = {
      width:'55%',
      float:'left', 
      fontWeight:'bold',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow:'hidden'
    }
    const ShowVote = {
      float:'right',
      color:'#FFA500'
    }
    const TouVote = {
      clear:'both',
      height:25, 
      marginTop: 10
    }
    const { img, title, voteCount, description, orderId, optionId } = this.props.data;
    const url='detailPage/'+optionId ;
    return (
      <Col span={12} style={{ padding: '5px', marginBottom: '10px'}}>
          <Link to={url}> 
            <div className="odv1">
              <img  src={img} style={ ImgFullDiv } />
            </div>
          </Link>
          <div style={ ShowNameVote }>
            <span style={ ShowName }>{title}</span>
            <span style={ ShowVote }>{voteCount}票</span>
          </div>
          <div style={{ wordBreak:'break-all'}}>{description}</div>
          <div style={ TouVote }>           
              <Button type="primary" size="small" style={{width:'100%'}} onClick={this.castvote.bind(this)}>投他一票</Button>
          </div>
          <span className="hao">{ orderId }号</span>
      </Col> 
    );
  }
}
