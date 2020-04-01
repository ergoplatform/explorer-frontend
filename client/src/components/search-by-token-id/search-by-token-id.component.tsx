import React from 'react';
import debounce from 'lodash/debounce';
import queryString from 'query-string';
import { SyntheticEvent } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';

import './search-by-token-id.scss';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { OrderBookActions } from '../../actions/orderBook.actions';

type Props = RouteComponentProps<any> & OrderBookActions;

class SearchByTokenId extends React.PureComponent<Props> {
  private inputElement!: HTMLInputElement;

  private onInputChangedDebounced: () => void;

  public constructor(props: Props) {
    super(props);

    this.onInputChangedDebounced = debounce(this.onInputChanged, 500);
  }

  componentDidMount() {
    const { tokenId = '' }: { tokenId?: string } = queryString.parse(
      this.props.location.search
    );

    if (tokenId && tokenId.trim()) {
      this.onInputChanged();
    }
  }

  public render(): JSX.Element {
    const { tokenId } = queryString.parse(this.props.location.search);

    return (
      <div className="bi-search-by-token">
        <form action="/order-book" onSubmit={this.onSubmit}>
          <div className="bi-search__form-group">
            <label htmlFor="tokenid">Token id</label>
            <input
              ref={(input: HTMLInputElement) => {
                this.inputElement = input;
              }}
              defaultValue={tokenId as string}
              onChange={this.onInputChangedDebounced}
              name="tokenid"
              id="tokenid"
              type="text"
              placeholder="a0f386048df205394d28594de6b38da1877ee989ad9e25074464a71fade6053e"
              className="bi-search-by-token__input"
            />
          </div>
        </form>
        <div className="results"></div>
      </div>
    );
  }

  private onSubmit = (event: SyntheticEvent<HTMLFormElement>): void => {
    event.preventDefault();
    this.onInputChanged();
  };

  private onInputChanged = (): void => {
    const tokenId = this.inputElement.value;
    const params = tokenId ? { tokenId } : {};
    if (!tokenId || !tokenId.trim()) {
      this.props.resetUnspentSellOrdersByTokenId();
      this.props.resetUnspentBuyOrdersByTokenId();

      return;
    }

    this.props.history.push(`/order-book?${queryString.stringify(params)}`);

    this.props.unspentSellOrdersByTokenId(tokenId);
    this.props.unspentBuyOrdersByTokenId(tokenId);
  };
}

const mapDispatchToProps = (dispatch: any): any => {
  return bindActionCreators({ ...OrderBookActions } as any, dispatch);
};

export const SearchByTokenIdComponent = connect(
  null,
  mapDispatchToProps
)(withRouter(SearchByTokenId));
