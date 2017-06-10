import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as TestActions from '../actions/test_actions'

import TestComponent from '../component/test_component'



class App extends Component {

  render() {
    const {
      test_reducer,
      actions
    } = this.props

    return (
      <TestComponent test_reducer={test_reducer} actions={ actions } />
    )
  }
}

//プロパティの型指定
App.propTypes = {
  actions: PropTypes.object.isRequired,
  test_reducer: PropTypes.object
}

function mapStateToProps(state) {
  return {
    test_reducer: state.test_reducer
  }
}

//bindActionCreatorsで../actionsないのアクションクリーエーターの内容をまとめてバインドしている
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign({}, TestActions), dispatch)
  }
}

//AppコンポーネントにmapStateToProps(state)とmapDispatchToProps(action)をつなぐ
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
