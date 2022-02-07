import classNames from 'classnames';
import debounce from 'lodash.debounce';
import queryString from 'query-string';
import React from 'react';
import { SyntheticEvent } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';

import { SearchIcon } from '../common/icons/common.icons';

import './search-v2.scss';

class Search extends React.PureComponent<RouteComponentProps<{}>> {
  inputElement!: HTMLInputElement;

  onInputChangedDebounced: () => void;

  constructor(props: RouteComponentProps<{}>) {
    super(props);

    this.onInputChanged = this.onInputChanged.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.onInputChangedDebounced = debounce(this.onInputChanged, 500);
  }

  render(): JSX.Element {
    const { query } = queryString.parse(this.props.location.search);

    const searchClassNames = classNames({
      'bi-search-v2': true,
      'g-flex': true,
      'g-flex__item-fixed': true,
    });

    return (
      <div className={searchClassNames}>
        <form
          action="/search"
          className="g-flex__item bi-search-v2__form"
          onSubmit={this.onSubmit}
        >
          <input
            className="bi-search-v2__input"
            ref={(input: HTMLInputElement) => {
              this.inputElement = input;
            }}
            defaultValue={query as string}
            onChange={this.onInputChangedDebounced}
            name="query"
            type="text"
            placeholder="Search for Block, Address, Transaction"
          />

          <SearchIcon className="bi-search-v2__icon" />
        </form>
      </div>
    );
  }

  private onSubmit(event: SyntheticEvent<HTMLFormElement>): void {
    event.preventDefault();
    this.onInputChanged();
  }

  private onInputChanged(): void {
    const query = this.inputElement.value;
    const params = query ? { query } : {};

    this.props.history.push(`/search?${queryString.stringify(params)}`);
  }
}

export const SearchV2Component = withRouter(Search);
