import React from 'react';

export class Display extends React.Component {
  
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const value = e.target.value;
    this.props.onChange(value);
  }

  render() {
    return <input value={this.props.value} onChange={this.handleChange} className="display" />;
  }
}

