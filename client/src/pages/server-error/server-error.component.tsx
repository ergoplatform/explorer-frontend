import React from 'react';

import './server-error.scss';

export class ServerErrorComponent extends React.PureComponent {
  render(): JSX.Element {
    return (
      <div className="bi-server-error">
        <h2>Unhandled Error occurred</h2>

        <a href={'/'}>Go back to home</a>
      </div>
    );
  }
}
