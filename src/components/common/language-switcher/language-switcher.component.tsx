import * as React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { SettingsActions } from '../../../actions/settings.actions';
import { SettingsState } from '../../../reducers/settings.reducer';

import { messages } from '../../../containers/connected-intl-provider/connected-intl-provider';

class LanguageSwitcher extends React.PureComponent<SettingsState & SettingsActions> {
  locales: string[] = Object.keys(messages);
  
  constructor (props: any) {
    super(props);
    
    this.onLocaleChanged = this.onLocaleChanged.bind(this);
  }
  
  onLocaleChanged (event: any): void {
    this.props.setLocale(event.target.value);
  }
  
  render (): JSX.Element {
    return (
      <div className='bi-language-switcher'>
        <select onChange={ this.onLocaleChanged } value={ this.props.locale }>
          {
            this.locales.map((localeId) => {
              return (<option value={ localeId } key={ localeId }>{ localeId }</option>);
            })
          }
        </select>
      </div>
    );
  }
}

function mapStateToProps (state: any): any {
  return state.settings;
}

function mapDispatchToProps (dispatch: any): any {
  return bindActionCreators(SettingsActions, dispatch);
}

export const LanguageSwitcherComponent = connect(mapStateToProps, mapDispatchToProps)(LanguageSwitcher);
