import * as React from 'react';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { bindActionCreators } from 'redux';

import environment from '../../config/environment';

import { ApiState } from '../../reducers/api.reducer';
import { AppState } from '../../store/app.store';

import { ApiActions } from '../../actions/api.actions';
import { ApiTagComponent } from '../../components/api/api-tag/api-tag.component';

import './api.scss';

class Api extends React.PureComponent<ApiState & ApiActions & RouteComponentProps<{ apiTag: string }>> {
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
        
        { this.props.data && (
          <div className='bi-api__header'>
            <div className='bi-api__title'>
              { environment.blockchain.coinName } Explorer { this.props.data && this.props.data.info.version }
            </div>
            
            { environment.apiUrl }
          </div>
        ) }
        
        
        { this.props.data && (
          <div className='bi-api__body'>
            { this.props.match.params.apiTag &&
            <ApiTagComponent tagName={ this.props.match.params.apiTag } openapi={ this.props.data }/> }
          </div>
        ) }
      
      
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
