import { Location } from 'history';
import React from 'react';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Redirect, Route, RouteComponentProps, Switch } from 'react-router';
import { withLastLocation } from 'react-router-last-location';
import { ActionCreatorsMapObject, bindActionCreators } from 'redux';

import { AppState } from '../../store/app.store';

import { AppActions } from '../../actions/app.actions';
import { BlockActions } from '../../actions/block.actions';
import { BlockState } from '../../reducers/block.reducer';

import { BlockAdproofsComponent } from '../../components/block/block-adproofs/block-adproofs.component';
import { BlockExtensionComponent } from '../../components/block/block-extension/block-extension.component';
import { BlockHeaderComponent } from '../../components/block/block-header/block-header.component';
import { BlockInfoComponent } from '../../components/block/block-info/block-info.component';
import { TransactionsComponent } from '../../components/transactions/transactions.component';

import './block.scss';

interface IBlockProps {
  lastLocation: Location;
}

class Block extends React.Component<
  IBlockProps &
    RouteComponentProps<{ id: string }> &
    BlockState &
    BlockActions &
    AppActions
> {
  prevLink = '';

  constructor(props: any) {
    super(props);

    this.renderComponent = this.renderComponent.bind(this);
  }

  componentDidMount(): void {
    if (this.props.preloaded) {
      this.props.clearPreloadedState();

      return;
    }

    this.props.getBlock({ id: this.props.match.params.id });
  }

  UNSAFE_componentWillReceiveProps(
    nextProps: RouteComponentProps<{ id: string }>
  ): void {
    if (nextProps.match.params.id !== this.props.match.params.id) {
      this.props.getBlock({ id: nextProps.match.params.id });
    }
  }

  render(): JSX.Element {
    return (
      <div className="bi-block g-flex-column__item-fixed">
        {this.props.fetching ? null : this.renderBlockPage()}
      </div>
    );
  }

  private renderBlockPage(): JSX.Element {
    if (!this.props.block) {
      return <Redirect to="/" />;
    }

    if (this.props.lastLocation && this.props.lastLocation.pathname === '/') {
      this.prevLink = this.props.lastLocation.search;
    }

    return (
      <div className="bi-block__wrapper g-flex-column">
        <FormattedMessage
          id="common.pages.block.title"
          values={{ id: this.props.block.header.id }}
        >
          {(title) => (
            <Helmet>
              <title>{title}</title>
            </Helmet>
          )}
        </FormattedMessage>

        <div className="bi-block__header g-flex-column__item-fixed">
          <BlockHeaderComponent
            block={this.props.block}
            prevLink={this.prevLink}
            references={this.props.references}
          />
        </div>

        <div className="bi-block__body g-flex-column__item g-scroll-y">
          <Switch>
            <Route
              path={`/blocks/:id`}
              exact={true}
              render={this.renderComponent(
                <BlockInfoComponent block={this.props.block} />
              )}
            />

            <Route
              path={`/blocks/:id/transactions`}
              exact={true}
              component={this.renderComponent(
                <TransactionsComponent
                  transactions={this.props.block.blockTransactions}
                />
              )}
            />

            <Route
              path={`/blocks/:id/extension`}
              exact={true}
              component={this.renderComponent(
                <BlockExtensionComponent
                  extension={this.props.block.extension}
                />
              )}
            />

            <Route
              path={`/blocks/:id/adproofs`}
              exact={true}
              component={this.renderComponent(
                <BlockAdproofsComponent block={this.props.block} />
              )}
            />
          </Switch>
        </div>
      </div>
    );
  }

  private renderComponent(element: JSX.Element): () => JSX.Element {
    return () => element;
  }
}

function mapStateToProps(state: AppState): BlockState {
  return {
    ...state.block,
  };
}

function mapDispatchToProps(dispatch: any): ActionCreatorsMapObject {
  return bindActionCreators({ ...BlockActions, ...AppActions }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withLastLocation(Block));
