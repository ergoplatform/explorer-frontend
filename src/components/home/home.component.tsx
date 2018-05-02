import * as React from 'react';
import { injectIntl } from 'react-intl';

import './home.scss';

import LanguageSwitcherComponent from '../language-switcher/language-switcher.component';
import InjectedIntlProps = ReactIntl.InjectedIntlProps;

class HomeComponent extends React.PureComponent {
  props: InjectedIntlProps;
  
  render (): JSX.Element {
    return (
      <div className="bi-home">
        { this.props.intl.formatMessage({ id: 'components.home.title' }) }
        <div className="bi-home__body">
          Explore blockchain
        </div>
        
        <LanguageSwitcherComponent/>
      </div>
    );
  }
}

export default injectIntl(HomeComponent);
