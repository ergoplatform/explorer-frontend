import classnames from 'classnames';
import React from 'react';

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

  private element: HTMLDivElement;

  constructor(props: IDropdownProps) {
    super(props);

    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.hideDropdown = this.hideDropdown.bind(this);
    this.hideOnOutsideClick = this.hideOnOutsideClick.bind(this);
  }

  render(): JSX.Element {
    const { list, button } = this.props;

    const dropdownClassNames = classnames({
      'bi-dropdown-list': true,
      'bi-dropdown-list--open': this.state.isDropdownShown,
    });

    return (
      <div
        className={dropdownClassNames}
        ref={(ref: HTMLDivElement) => {
          this.element = ref;
        }}
      >
        <button
          className="bi-dropdown-list__button g-flex bi-btn bi-btn--flat"
          onClick={this.toggleDropdown}
        >
          <span className="bi-dropdown-list__button-label">{button}</span>
        </button>

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
    if (this.state.isDropdownShown) {
      return this.hideDropdown();
    }

    this.setState({
      isDropdownShown: true,
    });

    document.addEventListener('click', this.hideOnOutsideClick);
  }

  private hideDropdown(): void {
    this.setState({
      isDropdownShown: false,
    });

    document.removeEventListener('click', this.hideOnOutsideClick);
  }

  private hideOnOutsideClick(event: MouseEvent): void {
    if (
      event.target !== this.element &&
      document.contains(event.target as Node) &&
      !this.element.contains(event.target as Node)
    ) {
      this.hideDropdown();
    }
  }
}
