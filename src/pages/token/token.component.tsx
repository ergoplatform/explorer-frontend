import { Location } from 'history';
import React from 'react';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { resetStruct } from 'redux-struct';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { withLastLocation } from 'react-router-last-location';
import { ActionCreatorsMapObject, bindActionCreators } from 'redux';
import { withAlert } from 'react-alert';

import { AppState } from '../../store/app.store';

import { AppActions } from '../../actions/app.actions';

import './token.scss';
import {
  ArrowIcon,
  NewCopyIcon,
} from 'src/components/common/icons/common.icons';
import { getTokenStructSelector } from 'src/selectors/token';
import { TokenActions } from 'src/actions/token.actions';
import { GET_TOKEN_STRUCT } from 'src/constants/struct.types';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Link } from 'react-router-dom';

interface Props {
  lastLocation: Location;
  alert: any;
  token: {
    error?: string;
    data?: {
      id: string;
      boxId: string;
      emissionAmount: number;
      name: string;
      description: string;
      type: string;
      decimals: number;
    };
    isFetching: boolean;
  };
}

class Token extends React.Component<
  Props & RouteComponentProps<{ id: string }> & TokenActions & AppActions
> {
  prevLink = '';

  constructor(props: any) {
    super(props);

    this.renderComponent = this.renderComponent.bind(this);
  }

  componentDidMount(): void {
    this.props.getTokenById({ id: this.props.match.params.id });
  }

  componentWillUnmount() {
    this.props.resetTokenStruct();
  }

  render(): JSX.Element {
    return (
      <div className="bi-token g-flex-column__item-fixed">
        {this.props.fetching ? null : this.renderBlockPage()}
      </div>
    );
  }

  private renderBlockPage(): JSX.Element {
    if (this.props.lastLocation) {
      this.prevLink =
        `${this.props.lastLocation.pathname}${this.props.lastLocation.search}`.trim();
    }

    return (
      <div className="bi-token__wrapper g-flex-column">
        <FormattedMessage
          id="common.pages.token.title"
          values={{ id: this.props.token.data?.id }}
        >
          {(title) => (
            <Helmet>
              <title>{title}</title>
            </Helmet>
          )}
        </FormattedMessage>

        <div className="bi-token__header g-flex-column__item-fixed">
          <div className="bi-token-header g-flex-column">
            <div className="bi-token-header__line g-flex-column__item-fixed">
              <Link
                className="bi-token-header__btn-back"
                to={`${this.prevLink || '/issued-tokens'}`}
              >
                <ArrowIcon className="bi-token-header__btn-back-icon" />

                <span className="bi-token-header__btn-back-title">
                  <FormattedMessage id="common.token.back" />
                </span>
              </Link>
            </div>

            <div className="bi-token-header__line g-flex-column__item g-flex">
              <div className="bi-token-header__title g-flex__item-fixed">
                <FormattedMessage id="common.token.token" />{' '}
                <span className="bi-token__title">
                  {this.props.token.data?.name
                    ? this.props.token.data?.name
                    : `${this.props.token.data?.id.slice(
                        0,
                        8
                      )}...${this.props.token.data?.id.slice(
                        this.props.token.data?.id.length - 8
                      )}`}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="bi-token__body">
          <h2 className="bi-token-body__title">
            <FormattedMessage id="common.token.tokenOverview" />
          </h2>
          <div className="bi-token-info">
            <div className="bi-token-info__item">
              <p className="bi-token-info__title">
                <FormattedMessage id="common.token.id" />
              </p>
              <p className="bi-token-info__description">
                {this.props.token.data?.id}
                <CopyToClipboard text={this.props.token.data?.id}>
                  <button
                    className="copy-label bi-token-info__description-icon"
                    onClick={() => {
                      this.props.alert.show(
                        <span style={{ textTransform: 'initial' }}>Copied</span>
                      );
                    }}
                  >
                    <NewCopyIcon className="copy-label__icon" /> Copy
                  </button>
                </CopyToClipboard>
              </p>
            </div>
            <div className="bi-token-info__center">
              <div className="bi-token-info__item">
                <p className="bi-token-info__title">
                  <FormattedMessage id="common.token.name" />
                </p>
                <p className="bi-token-info__description">
                  {this.props.token.data?.name || 'None'}
                </p>
              </div>
              <div className="bi-token-info__item">
                <p className="bi-token-info__title">
                  <FormattedMessage id="common.token.emissionAmount" />
                </p>
                <p className="bi-token-info__description">
                  {this.props.token.data?.emissionAmount}
                </p>
              </div>
              <div className="bi-token-info__item">
                <p className="bi-token-info__title">
                  <FormattedMessage id="common.token.type" />
                </p>
                <p className="bi-token-info__description">
                  {this.props.token.data?.type || 'None'}
                </p>
              </div>
              <div className="bi-token-info__item">
                <p className="bi-token-info__title">
                  <FormattedMessage id="common.token.decimals" />
                </p>
                <p className="bi-token-info__description">
                  {this.props.token.data?.decimals || 0}
                </p>
              </div>
            </div>
            <div className="bi-token-info__item">
              <p className="bi-token-info__title">
                <FormattedMessage id="common.token.description" />
              </p>
              <p className="bi-token-info__description">
                {this.props.token.data?.description || 'None'}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  private renderComponent(element: JSX.Element): () => JSX.Element {
    return () => element;
  }
}

function mapStateToProps(state: AppState): any {
  return {
    token: getTokenStructSelector(state),
    ...state.settings,
  };
}

function mapDispatchToProps(dispatch: any): ActionCreatorsMapObject {
  return bindActionCreators(
    {
      ...TokenActions,
      resetTokenStruct: () => dispatch(resetStruct(GET_TOKEN_STRUCT)),
    },
    dispatch
  );
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withAlert()(withLastLocation(Token)));
