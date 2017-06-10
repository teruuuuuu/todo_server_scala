import React, { Component, findDOMNode, PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const textStyle = {
  'background': 'rgba(0,0,0,.05)',
  'borderColor': '#aaa',
  'boxShadow': 'inset 0 1px 8px rgba(0,0,0,.15)'
};

const buttonStyle = {
  'marginTop': '5px'
};

const itemStyle = {
  'margin': '5px'
}


export default class TodoListAdd extends Component {
  constructor(props, context) {
    super(props, context);
    this.addList = this.addList.bind(this);
  }

  static propTypes = {
    addList: PropTypes.func.isRequired
  }

  addList(){
    const listText = this.refs.listText.getValue();
    this.props.addList(listText)
  }

  render() {

    return (
      <div className="list-add">
        <div style={itemStyle}>
          <TextField hintText="リストを追加" style={textStyle} ref="listText"/><br />
          <RaisedButton label="追加" primary={true} style={buttonStyle} onClick={this.addList} />
        </div>
      </div>
    );
  }
}
