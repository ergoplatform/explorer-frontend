import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { SettingsActions } from '../../../actions/settings.actions';
import { SettingsState } from '../../../reducers/settings.reducer';

import { messages } from '../../../containers/connected-intl-provider/connected-intl-provider';

import { DropdownComponent } from '../dropdown/dropdown.component';

import './language-switcher.scss';

class LanguageSwitcher extends React.PureComponent<
  SettingsState & SettingsActions
> {
  locales: any;

  constructor(props: any) {
    super(props);

    this.locales = Object.keys(messages).map((locale) => {
      return {
        label: (
          <FormattedMessage id={`components.language-switcher.${locale}`} />
        ),
        value: locale,
      };
    });

    this.onLocaleChanged = this.onLocaleChanged.bind(this);
  }

  onLocaleChanged(value: any): any {
    const searchString = `${window.location.origin}/${
      this.props.locale || 'en'
    }`;
    let pathname = '';

    if (window.location.href.indexOf(searchString) !== -1) {
      pathname = window.location.href.replace(
        `${window.location.origin}/${this.props.locale || 'en'}`,
        `${window.location.origin}/${value || 'en'}`
      );
    } else {
      pathname = window.location.href.replace(
        `${window.location.origin}`,
        `${window.location.origin}/${value || 'en'}`
      );
    }

    // this.props.setLocale(value);

    window.location.replace(pathname);
  }

  render(): JSX.Element {
    const selectedLocale = {
      label: (
        <FormattedMessage
          id={`components.language-switcher.${this.props.locale || 'en'}`}
        />
      ),
      value: this.props.locale || 'en',
    };

    return (
      <div className="bi-language-switcher">
        <DropdownComponent
          options={this.locales}
          selected={selectedLocale}
          onChange={this.onLocaleChanged}
        />
      </div>
    );
  }
}

function mapStateToProps(state: any): any {
  return state.settings;
}

function mapDispatchToProps(dispatch: any): any {
  return bindActionCreators(SettingsActions, dispatch);
}

export const LanguageSwitcherComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(LanguageSwitcher);
