import React from 'react';

interface ICopyTextProps {
  children: string | number;
}

export class CopyTextComponent extends React.Component<ICopyTextProps> {
  copyToClipboard(event: any) {
    const textarea = document.createElement('textarea');
    textarea.value = event.target.textContent || '';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
  }

  render() {
    // TODO add icon and tooltip "copied"
    return (
      <a
        className="bi-copy-text"
        style={{ cursor: 'pointer' }}
        onClick={this.copyToClipboard}
      >
        {this.props.children}
      </a>
    );
  }
}
