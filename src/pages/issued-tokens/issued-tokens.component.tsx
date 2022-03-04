import queryString from 'query-string';
import React from 'react';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { bindActionCreators } from 'redux';
import { debounce, isEmpty } from 'lodash';

import { AppState } from '../../store/app.store';

import { IGetBlocksParams } from '../../services/block.api.service';

import { LimitSelectorComponent } from '../../components/common/limit-selector/limit-selector.component';
import { PaginateSimpleComponent } from '../../components/common/paginate-simple/paginate-simple.component';
import { IssuedTokensActions } from '../../actions/issuedTokens.actions';
import { getAllIssuedTokensStructSelector } from '../../selectors/issuedTokens';
import { IssuedTokensTableComponent } from '../../components/issued-tokens-table/issued-tokens-table.component';

import './issued-tokens.scss';

type IDataProps = AppState &
  IssuedTokensActions &
  RouteComponentProps<{}> & {
    tokens: any;
    offset: number;
  };

class IssuedTokens extends React.PureComponent<IDataProps, any> {
  params: any;

  constructor(props: any) {
    super(props);

    this.getPageUrl = this.getPageUrl.bind(this);
    this.getLimitLink = this.getLimitLink.bind(this);
    const { searchQuery } = queryString.parse(
      this.props.history.location.search
    );

    this.params = this.getParams();
    this.state = {
      searchInput: searchQuery || '',
    };
  }

  componentDidMount(): void {
    this.reloadTokens(this.params);
  }

  updateTable = debounce((value) => {
    const params: any = queryString.parse(this.props.history.location.search);

    this.props.history.push(
      `/issued-tokens?${queryString.stringify({
        searchQuery: value,
        limit: params.limit,
      })}`
    );
  }, 300);

  onChangeInput = (e: any) => {
    this.setState({ searchInput: e.target.value });

    this.updateTable(e.target.value);
  };

  UNSAFE_componentWillReceiveProps(props: IDataProps): void {
    const params = this.getParams();

    if (JSON.stringify(params) !== JSON.stringify(this.params)) {
      this.params = params;
      this.reloadTokens(this.params);
    }
  }

  renderTable = () => {
    if (this.props.tokens.isFetching) {
      return <p className="base-text">Fetching Data...</p>;
    }

    if (this.props.tokens.data && this.props.tokens.data.total === 0) {
      return (
        <div className="bi-issued-tokens__body g-flex-column__item-fixed">
          <FormattedMessage id="components.data.wrong-query" />
        </div>
      );
    }

    if (
      !this.props.tokens.isFetching &&
      this.props.tokens.data !== null &&
      this.props.tokens.data.items.length > 0
    ) {
      return (
        <>
          <div className="bi-issued-tokens__body g-flex-column__item-fixed">
            <IssuedTokensTableComponent
              tokens={this.props.tokens.data.items}
              isFetching={this.props.tokens.isFetching}
            />
          </div>
          <div className="bi-issued-tokens__footer g-flex-column__item-fixed g-flex">
            <div className="g-flex__item-fixed">
              <LimitSelectorComponent
                items={[30, 60, 120]}
                selected={this.params.limit}
                label={<FormattedMessage id="components.data.show" />}
                getLimitLink={this.getLimitLink}
              />
            </div>

            <div className="g-flex__item-fixed">
              <PaginateSimpleComponent
                total={this.props.tokens.data.total}
                limit={this.params.limit}
                getPageUrl={this.getPageUrl}
                forcePage={Math.floor(this.props.offset / this.params.limit)}
              />
            </div>
          </div>
        </>
      );
    }

    return;
  };

  render(): JSX.Element {
    return (
      <div className="bi-issued-tokens g-flex-column g-flex-column__item-fixed">
        <FormattedMessage id="common.pages.issued-tokens.title">
          {(title) => (
            <Helmet>
              <title>{title}</title>
            </Helmet>
          )}
        </FormattedMessage>

        <div className="bi-issued-tokens__header g-flex-column__item-fixed g-flex">
          <div className="bi-issued-tokens__title">
            <FormattedMessage id="components.issued-tokens.title" />
          </div>

          <div>
            <input
              className="bi-issued-tokens__input"
              type="string"
              onChange={this.onChangeInput}
              value={this.state.searchInput}
              placeholder="Search by ID or Number"
            />
          </div>
        </div>
        {this.renderTable()}
      </div>
    );
  }

  private getPageUrl(page: number): string {
    const params: any = queryString.parse(this.props.history.location.search);

    params.offset = page * this.params.limit;

    return `/issued-tokens?${queryString.stringify(params)}`;
  }

  private getLimitLink(limit: number): string {
    const params: any = queryString.parse(this.props.history.location.search);

    params.limit = limit;

    return `/issued-tokens?${queryString.stringify(params)}`;
  }

  private reloadTokens(params: IGetBlocksParams): void {
    params = {
      ...this.params,
      ...params,
      limit: params.limit || 30,
      offset: params.offset || 0,
      searchQuery: params.searchQuery,
    };

    Object.keys(params).forEach((key) => {
      if (params[key] === null) {
        delete params[key];
      }
    });

    this.props.getTokens(params);

    if (params.offset === 0) {
      delete params.offset;
    }

    if (params.limit === 30) {
      delete params.limit;
    }

    if (isEmpty(queryString.stringify(params))) {
      return;
    }

    this.props.history.push(`/issued-tokens?${queryString.stringify(params)}`);
  }

  private getParams(): any {
    let { offset, limit }: any = queryString.parse(
      this.props.history.location.search
    );

    const { searchQuery } = queryString.parse(
      this.props.history.location.search
    );

    offset = parseInt(offset, 10);
    limit = parseInt(limit, 10) || 30;

    return {
      limit,
      offset: offset || 0,
      searchQuery,
    };
  }
}

const mapStateToProps = (state: any): any => ({
  tokens: getAllIssuedTokensStructSelector(state),
  offset: state.tokens.offset,
});

const mapDispatchToProps = (dispatch: any): any => {
  return bindActionCreators({ ...IssuedTokensActions }, dispatch);
};

const IssuedTokensComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(IssuedTokens);

export default IssuedTokensComponent;
