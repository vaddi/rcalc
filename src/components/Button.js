import React from 'react';
import PropTypes from 'prop-types';

export class Button extends React.Component {
  
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    const value = e.target.value;
    this.props.onClick(value);
  }
  
  showTitle(e) {
    const title = e.target.title;
    if (title === undefined ) {
      return 'test_' + this.props.title;
    } else {
      return title;
    }
  }
  
  render() {
    return (
      <button title={this.props.title} value={this.props.value} onClick={this.handleClick} className={this.props.className}>
        {this.props.title}
      </button>
    );
  }
}

Button.propTypes = {
  title: PropTypes.string.isRequired,
};
