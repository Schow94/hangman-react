import React, { Component } from 'react';

export default class AlphaButtons extends Component {
  constructor(props) {
    super(props);
    this.onGenerateButtons = this.onGenerateButtons.bind(this);
  }

  onGenerateButtons() {
    this.generateButtons();
  }

  render() {
    return <div>{this.onGenerateButtons()}</div>;
  }
}
