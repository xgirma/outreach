import React, { Component } from 'react';
import RichTextEditor, { createEmptyValue} from 'react-rte';
import { toolbarConfig } from '../helper';

export class Introduction extends Component {
  displayName = 'introduction';

  static propTypes = {};

  static defaultProps = {};

  state = {
    value: createEmptyValue(),
    introduction: '',
  };
  
  onChange = (value) => {
    const introduction = value.toString('html');
    this.setState((state) => ({ value, introduction}));
  };

  render() {
    console.log('state: ', this.state);
    return (
      <div>
      <div>Hello introduction</div>
        <RichTextEditor
          value={this.state.value}
          onChange={this.onChange}
          toolbarConfig={toolbarConfig}
        />
      </div>
    )
  }
}
