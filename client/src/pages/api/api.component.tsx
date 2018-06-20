import * as React from 'react';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { ApiState } from '../../reducers/api.reducer';
import { AppState } from '../../store/app.store';

import { ApiActions } from '../../actions/api.actions';

class Api extends React.PureComponent<ApiState & ApiActions> {
  componentDidMount (): void {
    this.props.getApi();
  }
  
  render (): JSX.Element {
    return (
      <div className='bi-api'>
        <FormattedMessage id='common.pages.api.title'>
          {
            title => (
              <Helmet>
                <title>{ title }</title>
              </Helmet>
            )
          }
        </FormattedMessage>
        
        {this.props.data && this.props.data.openapi}
      </div>
    );
  }
}

function mapStateToProps (state: AppState): ApiState {
  return state.api;
}

function mapDispatchToProps (dispatch: any): any {
  return bindActionCreators(ApiActions, dispatch);
}

export const ApiComponent = connect(mapStateToProps, mapDispatchToProps)(Api);
