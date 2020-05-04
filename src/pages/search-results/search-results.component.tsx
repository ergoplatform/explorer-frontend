import queryString from 'query-string';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Redirect, RouteComponentProps } from 'react-router';
import { bindActionCreators } from 'redux';

import { AppActions } from '../../actions/app.actions';
import { SearchActions } from '../../actions/search.actions';
import { SearchState } from '../../reducers/search.reducer';
import { AppState } from '../../store/app.store';

import { BlocksTableComponent } from '../../components/blocks-table/blocks-table.component';

import './search-results.scss';

type ISearchResultsProps = RouteComponentProps<{}> &
  SearchActions &
  SearchState &
  AppActions;

interface ISearchResultsState {
  canSearch: boolean;
}

class SearchResults extends React.Component<
  ISearchResultsProps,
  ISearchResultsState
> {
  state: ISearchResultsState = {
    canSearch: true,
  };

  private query!: string;

  componentDidMount(): void {
    if (this.props.preloaded) {
      this.props.clearPreloadedState();

      return;
    }

    const { query = '' } = queryString.parse(this.props.location.search);

    this.query = query as string;

    this.doSearch();
  }

  UNSAFE_componentWillReceiveProps(nextProps: ISearchResultsProps): void {
    const { query = '' } = queryString.parse(nextProps.location.search);

    if (query !== this.query) {
      this.query = query as string;

      this.doSearch();
    }
  }

  render(): JSX.Element {
    return (
      <div className="bi-search-results">
        {!this.state.canSearch ? (
          <div className="bi-search-results__body">
            <FormattedMessage id="components.search-results.wrong-query" />
          </div>
        ) : (
          this.renderBody()
        )}
      </div>
    );
  }

  private renderBody(): JSX.Element | null {
    if (!this.props.data) {
      return null;
    }

    const { blocks, addresses, transactions } = this.props.data;

    const exactBlock = blocks.find((item: any) => item.id === this.query);
    const exactTransaction = transactions.includes(this.query);
    const exactAddress = addresses.includes(this.query);

    // TODO: After available height search on backend, code can uncomment
    // if (this.query[0] === '#') {
    //   const exactHashIndex = blocks.find((item: any) => item.height === this.query.substring(1));

    //   if (exactHashIndex !== -1) {
    //     return <Redirect to={ `/blocks/${blocks[exactHashIndex]}` }/>;
    //   }
    // }

    if (blocks.length === 1) {
      return <Redirect to={`/blocks/${blocks[0].id}`} />;
    }

    if (addresses.length === 1) {
      return <Redirect to={`/addresses/${addresses[0]}`} />;
    }

    if (transactions.length === 1) {
      return <Redirect to={`/transactions/${transactions[0]}`} />;
    }

    if (exactBlock) {
      return <Redirect to={`/blocks/${this.query}`} />;
    }

    if (exactAddress) {
      return <Redirect to={`/addresses/${this.query}`} />;
    }

    if (exactTransaction) {
      return <Redirect to={`/transactions/${this.query}`} />;
    }

    return (
      <div className="bi-search-results__body">
        {blocks.length === 0 && (
          <FormattedMessage id="components.search-results.no-results" />
        )}

        {blocks.length > 0 && (
          <BlocksTableComponent
            blocks={blocks}
            isFetching={this.props.fetching}
          />
        )}
      </div>
    );
  }

  private doSearch(): void {
    if (this.query.length < 5) {
      this.setState({ canSearch: false });

      return;
    }

    this.setState({ canSearch: true });

    this.props.search(this.query as string);
  }
}

function mapStateToProps(state: AppState): SearchState {
  return state.search;
}

function mapDispatchToProps(dispatch: any): any {
  return bindActionCreators({ ...SearchActions, ...AppActions }, dispatch);
}

const SearchResultsComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchResults);

export default SearchResultsComponent;
