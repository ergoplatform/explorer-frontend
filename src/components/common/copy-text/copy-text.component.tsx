import React from 'react';
import { CopyIcon } from '../icons/common.icons';

// TODO: change the second type to FormattedMessage
interface ICopyTextProps {
  children: string | any;
  isNotShowIcon?: boolean;
  onClick?: () => void;
  className?: string;
}

export class CopyTextComponent extends React.Component<ICopyTextProps> {
  constructor(props: ICopyTextProps) {
    super(props);

    this.copyToClipboard = this.copyToClipboard.bind(this);
  }

  render() {
    return (
      <span
        onClick={() => {
          if (this.props.onClick) {
            this.props.onClick();
          }
          this.copyToClipboard();
        }}
        style={{
          cursor: 'pointer',
          color: 'rgb(0, 120, 255)',
          display: 'inline-flex',
          alignItems: 'center',
        }}
        className={this.props.className}
      >
        {!this.props.isNotShowIcon && (
          <div
            style={{
              height: '16px',
            }}
          >
            <CopyIcon />
          </div>
        )}

        <a
          className="bi-copy-text"
          style={{ marginLeft: !this.props.isNotShowIcon ? '10px' : 0 }}
        >
          {this.props.children}
        </a>
      </span>
    );
  }

  private getTextContent() {
    if (typeof this.props.children === 'string') {
      return this.props.children;
    }

    if (typeof this.props.children === 'object') {
      return this.props.children.props.id;
    }

    return;
  }

  private copyToClipboard() {
    const textContent = this.getTextContent();

    if (!textContent) {
      return;
    }

    const textarea = document.createElement('textarea');

    textarea.value = textContent || '';
    document.body.appendChild(textarea);
    textarea.select();

    document.execCommand('copy');
    document.body.removeChild(textarea);
  }
}
