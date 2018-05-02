import * as React from 'react';

import HomeComponent from '../../components/home/home.component';

export class AppComponent extends React.PureComponent {
  render (): JSX.Element {
    return (<HomeComponent/>);
  }
}
