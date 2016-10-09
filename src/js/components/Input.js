import React from "react";

export default class Input extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      errorLabel: ''
    }
  }

  render() {
    let isError = this.state.errorLabel && this.state.errorLabel.trim().length!=0;

    return (
      <div style={this.props.style}>
        <div style={styles.labelContainer}>
          <label for={this.props.name} style={styles.leftLabel}>{this.props.label}</label>
          <label for={this.props.name} style={styles.rightLabel}>{this.state.errorLabel}</label>
        </div>
        <input style={!isError ? styles.input : styles.errorInput} type={this.props.type} 
          name={this.props.name} value={this.props.value}
          onBlur={()=>this.props.onBlur && this.props.onBlur()}
          onChange={(event) => this.props.onChange && this.props.onChange(event.target.value)} />
      </div>
    );
  }

  setErrorLabel(label) {
    this.setState({errorLabel: label})
  }

  getValue() {
    return this.props.value;
  }
}

const styles = {
  input: {
  	padding: 5, 
  	width: '100%'
  },

  errorInput: {
    padding: 5, 
    width: '100%',
    borderColor: 'red'
  },

  labelContainer: {
    display: 'flex', 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    width: '100%'    
  },

  leftLabel: {
    textAlign: 'left'
  },

  rightLabel: {
    fontSize: 'smaller',
    textAlign: 'right',
    color: 'red'
  }
}