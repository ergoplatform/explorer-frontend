import React from 'react';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import environment from '../../config/environment';

import { ApiState } from '../../reducers/api.reducer';
import { AppState } from '../../store/app.store';

import { ApiActions } from '../../actions/api.actions';

import './api.scss';
import { ApiPathComponent } from '../../components/api/api-path/api-path.component';

class Api extends React.PureComponent<ApiState & ApiActions> {
  componentDidMount(): void {
    if (!this.props.data) {
      this.props.getApi();
    }
  }

  render(): JSX.Element {
    return (
      <div className="bi-api">
        <FormattedMessage id="common.pages.api.title">
          {(title) => (
            <Helmet>
              <title>{title}</title>
            </Helmet>
          )}
        </FormattedMessage>

        {this.props.data && (
          <div className="bi-api__header">
            <div className="bi-api__title">
              {environment.blockchain.coinName} Explorer{' '}
              {this.props.data && this.props.data.info.version}
            </div>

            {environment.apiUrl}
          </div>
        )}

        {this.props.data && (
          <div className="bi-api__body">
            {Object.keys(this.props.data.paths).map((path) => {
              return (
                <ApiPathComponent
                  key={path}
                  pathName={path}
                  paths={this.props.data.paths[path]}
                />
              );
            })}
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state: AppState): ApiState {
  return state.api;
}

function mapDispatchToProps(dispatch: any): any {
  return bindActionCreators(ApiActions, dispatch);
}

export const ApiComponent = connect(mapStateToProps, mapDispatchToProps)(Api);

export default ApiComponent;
