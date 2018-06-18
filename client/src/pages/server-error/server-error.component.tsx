import * as React from 'react';
import { Link } from 'react-router-dom';

import './server-error.scss';

export class ServerErrorComponent extends React.PureComponent {
  render (): JSX.Element {
    return (
      <div className='bi-server-error'>
        <h2>
          Unhandled Error occurred
        </h2>
        
        <Link to={'/'}>Go back to home</Link>
        <Link to={'/feedback'}>Contact Support</Link>
      </div>
    );
  }
}
