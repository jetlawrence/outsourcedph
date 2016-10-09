import React from "react";

export default class CheckBox extends React.Component {

  render() {
    return (
    <div>
      <input ref="checkbox" type="checkbox" name={this.props.name} onChange={(event) => this.props.onChange(event.target.checked)}/>
      <label for={this.props.name}>{this.props.label}</label>
    </div>
    );
  }

  isChecked() {
  	return this.refs.checkbox.checked;
  }

}