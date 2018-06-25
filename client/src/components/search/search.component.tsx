import * as classNames from 'classnames';
import debounce from 'lodash/debounce';
import * as queryString from 'query-string';
import * as React from 'react';
import { SyntheticEvent } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';

import { SearchIcon } from '../common/icons/common.icons';

import './search.scss';

class Search extends React.PureComponent<RouteComponentProps<{}>> {
  state: {
    isInputFocused: boolean,
  } = {
    isInputFocused: false
  };
  
  inputElement: HTMLInputElement;
  
  onInputChangedDebounced: () => void;
  
  constructor (props: any) {
    super(props);
    
    this.focusInput     = this.focusInput.bind(this);
    this.onInputBlur    = this.onInputBlur.bind(this);
    this.onInputChanged = this.onInputChanged.bind(this);
    this.onSubmit       = this.onSubmit.bind(this);
    
    this.onInputChangedDebounced = debounce(this.onInputChanged, 500);
  }
  
  componentDidUpdate (): void {
    if (this.state.isInputFocused) {
      this.inputElement.focus();
    }
  }
  
  render (): JSX.Element {
    const { query } = queryString.parse(this.props.location.search);
    
    const searchClassNames = classNames({
      'bi-search': true,
      'bi-search--focused': this.state.isInputFocused || query,
      'g-flex': true,
      'g-flex__item-fixed': true
    });
    
    return (
      <div className={ searchClassNames }>
        <button className='bi-btn bi-btn--flat g-flex__item-fixed'
                onClick={ this.focusInput }
                tabIndex={ this.state.isInputFocused ? -1 : 0 }>
          <SearchIcon className='bi-search__icon'/>
        </button>
        
        <form action='/search' className='g-flex__item' onSubmit={ this.onSubmit }>
          <input className='bi-search__input'
                 ref={ (input: HTMLInputElement) => {
                   this.inputElement = input;
                 } }
                 defaultValue={ query }
                 onChange={ this.onInputChangedDebounced }
                 name='query'
                 type='text'
                 placeholder='Block, Hash, Transaction, Etc…'
                 onBlur={ this.onInputBlur }/>
        </form>
      </div>
    );
  }
  
  private onSubmit (event: SyntheticEvent<HTMLFormElement>): void {
    event.preventDefault();
    
    this.onInputChanged();
  }
  
  private onInputBlur (): void {
    this.setState({
      isInputFocused: false
    });
  }
  
  private onInputChanged (): void {
    const params = {
      query: this.inputElement.value
    };
    
    if (!params.query) {
      delete params.query;
    }
    
    this.props.history.push(`/search?${queryString.stringify(params)}`);
  }
  
  private focusInput (): void {
    this.setState({
      isInputFocused: true
    });
  }
}

export const SearchComponent = withRouter(Search);
