import React from 'react';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import environment from '../../config/environment';

import { ApiDocsState } from '../../reducers/api.reducer';
import { AppState } from '../../store/app.store';
import { apiDocStructSelector } from '../../selectors/apiDoc';
import { ApiDocsActions } from '../../actions/api.actions';

import './api.scss';
import { ApiPathComponent } from '../../components/api/api-path/api-path.component';

const apiOrigin = new URL(environment.apiUrl as string).origin;

class Api extends React.PureComponent<ApiDocsState & ApiDocsActions> {
  componentDidMount(): void {
    if (!this.props.data) {
      this.props.getApiDocs();
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

            {apiOrigin}
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

function mapStateToProps(state: AppState): ApiDocsState {
  return apiDocStructSelector(state);
}

function mapDispatchToProps(dispatch: any): any {
  return bindActionCreators(ApiDocsActions, dispatch);
}

export const ApiDocsComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(Api);

export default ApiDocsComponent;
