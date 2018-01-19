# redux-action-tools

#### action

```
import { createAsyncAction } from 'redux-action-tools';
import request from '../../../lib/request';

export const getAreaInfo = createAsyncAction('GET_AREA_INFO', async (parseId) => {
  const { body } = await request.post('/web/api?method=get_lb_detail_by_id', {
    lb_id: parseId,
  }).type('form');
  return body;
});
```

#### reducer

```
import { createReducer } from 'redux-action-tools';
import I from 'immutable';

// const initValue = I.Map({
//   data: {}, // key: featureName, value: bool
//   fetching: false,
// });
const initValue = {
  data: null,
  fetching: false,
};

const reducer = createReducer()
  .when('GET_AREA_INFO', (state) => {
    return { ...state, fetching: true };
  })
  .done((state, action) => {
    return { ...state, data: action.payload, fetching: false };
  })
  .failed((state, action) => {
    return { ...state, fetching: false };
  })
  .build(initValue); // 不要忘了调用build


export default reducer;
```

#### component

```
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


import { getAreaInfo } from './slbConfAction';

class IndexPage extends Component {
  componentDidMount() {
    // dispatch(getAreaInfo(231));
    this.props.actions.getAreaInfo(231);
  }
  render() {
    return (
      <div></div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ getAreaInfo }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(IndexPage);

```

