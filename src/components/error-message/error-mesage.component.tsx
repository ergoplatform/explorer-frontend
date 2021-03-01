import React from 'react';
import { FormattedMessage } from 'react-intl';

import './error-message.scss';

interface IErrorMessage {
  message: string;
}

class ErrorMessageComponent extends React.PureComponent<IErrorMessage> {
  render() {
    const { message } = this.props;

    return (
      <div className="error-message">
        <div className="error-message__content">
          <FormattedMessage id={message} />
        </div>
      </div>
    );
  }
}

export { ErrorMessageComponent };
