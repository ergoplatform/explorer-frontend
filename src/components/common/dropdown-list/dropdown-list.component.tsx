import classnames from 'classnames';
import React from 'react';
import { AddressIssuedTokensModalComponent } from 'src/components/modals/address-issued-tokens-modal/address-issued-tokens-modal.component';

import './dropdown-list.scss';

interface IDropdownProps {
  list: any[];
  button: string;
}

interface IDropdownState {
  isDropdownShown: boolean;
}

export class DropdownListComponent extends React.PureComponent<
  IDropdownProps,
  IDropdownState
> {
  state: IDropdownState = {
    isDropdownShown: false,
  };

  constructor(props: IDropdownProps) {
    super(props);

    this.toggleDropdown = this.toggleDropdown.bind(this);
  }

  render(): JSX.Element {
    const { list, button } = this.props;

    const dropdownClassNames = classnames({
      'bi-dropdown-list': true,
    });

    return (
      <div className={dropdownClassNames}>
        <button
          className="bi-dropdown-list__button g-flex bi-btn bi-btn--flat"
          onClick={this.toggleDropdown}
        >
          <span className="bi-dropdown-list__button-label">{button}</span>
        </button>

        {this.state.isDropdownShown && (
          <AddressIssuedTokensModalComponent
            isOpen={this.state.isDropdownShown}
            onClose={this.toggleDropdown}
            title="Tokens"
            issuedTokens={list}
          />
        )}

        <ul className="bi-dropdown-list__dropdown">
          {list.map((option: any, ind) => {
            return (
              <li
                className="bi-dropdown-list__option"
                key={`${option.value}_${ind}_${option.label}`}
              >
                <span>{option.value}</span>&nbsp;{option.label}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  private toggleDropdown(): void {
    this.setState({
      isDropdownShown: !this.state.isDropdownShown,
    });
  }
}
