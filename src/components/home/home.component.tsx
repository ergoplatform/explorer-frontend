import * as React from 'react';

import './home.scss';

export class HomeComponent extends React.PureComponent {
  render (): JSX.Element {
    return (
      <div className="bi-home">
        Blockchain Explorer
        <div className="bi-home__body">
          Explore blockchain
        </div>
      </div>
    );
  }
}
