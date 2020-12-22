import React from 'react';
import { CopyIcon } from '../icons/common.icons';

interface ICopyTextProps {
  children: string;
}

export class CopyTextComponent extends React.Component<ICopyTextProps> {
  constructor(props: ICopyTextProps) {
    super(props);

    this.copyToClipboard = this.copyToClipboard.bind(this);
  }

  render() {
    return (
      <span
        onClick={this.copyToClipboard}
        style={{ cursor: 'pointer', color: 'rgb(0, 120, 255);' }}
      >
        <a className="bi-copy-text" style={{ marginRight: '10px' }}>
          {this.props.children}
        </a>
        <CopyIcon />
      </span>
    );
  }

  private copyToClipboard() {
    const textContent = this.props.children;
    const textarea = document.createElement('textarea');

    textarea.value = textContent || '';
    document.body.appendChild(textarea);
    textarea.select();

    document.execCommand('copy');
    document.body.removeChild(textarea);
  }
}
