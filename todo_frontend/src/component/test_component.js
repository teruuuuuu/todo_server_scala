/**
 * In this file, we create a React component
 * which incorporates components provided by Material-UI.
 */
import React, { Component, PropTypes } from 'react'

import TextField from 'material-ui/TextField'
import MaterialDialog from '../component/material-dialog'

class TestComponent extends Component {
  constructor(props, context) {
    super(props, context);
  }

  onChange(e) {
     this.props.actions.change_text(e.target.value)
  }

  handleCommentSubmit(title, text) {
    alert(title + text)
  }

  render() {
    const {
      test_reducer
    } = this.props

    return (
      <div>
        <input type="text" onChange = { this.onChange.bind(this) } value = { test_reducer.text }/><br />
        <TextField hintText="The hint text can be as long as you want, it will wrap."  /><br />
        <TextField hintText="Message Field" floatingLabelText="MultiLine and FloatingLabel" multiLine={true} rows={1} /><br />
        <p>{ test_reducer.text }</p>
        <MaterialDialog onCommentSubmit={this.handleCommentSubmit} />
      </div>
    );
  }
}


TestComponent.propTypes = {
  test_reducer: PropTypes.object,
  actions: PropTypes.object.isRequired,
}
export default TestComponent
