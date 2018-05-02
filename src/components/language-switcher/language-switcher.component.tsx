import * as React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as settingsActions from '../../actions/settings.actions';

class LanguageSwitcherComponent extends React.PureComponent {
  locales: string[] = ['en', 'ru'];
  props: any;
  
  constructor (props: any) {
    super(props);
    
    this.onLocaleChanged = this.onLocaleChanged.bind(this);
  }
  
  onLocaleChanged (event: any): void {
    this.props.setLocale(event.target.value);
  }
  
  render (): JSX.Element {
    return (
      <div>
        { this.props.locale }
        
        <select onChange={ this.onLocaleChanged }>
          { this.locales.map((localeId) => {
            return (<option value={ localeId } key={ localeId }
                            selected={ localeId === this.props.locale }>{ localeId }</option>);
          }) }
        </select>
      </div>
    );
  }
}

function mapStateToProps (state: any): any {
  return state.settings;
}

function mapDispatchToProps (dispatch: any): any {
  return bindActionCreators(settingsActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LanguageSwitcherComponent);
