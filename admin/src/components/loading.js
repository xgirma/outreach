/* eslint-disable react/destructuring-assignment, no-unused-expressions */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Loading extends Component {
  static displayName = 'loading';

  static propTypes = {
    text: PropTypes.string,
    speed: PropTypes.number,
  };

  static defaultProps = {
    text: 'Loading',
    speed: 300,
  };

  state = {
    text: this.props.text,
    speed: this.props.speed,
  };

  componentDidMount() {
    const { text, speed } = this.state;
    const stopper = `${text}...`;

    this.interval = window.setInterval(() => {
      this.state.text === stopper
        ? this.setState({ text: this.props.text })
        : this.setState((currentState) => ({ text: `${currentState.text}.` }));
    }, speed);
  }

  componentWillUnmount() {
    window.clearInterval(this.interval);
  }

  render() {
    const { text } = this.state;
    return <p>{text}</p>;
  }
}
