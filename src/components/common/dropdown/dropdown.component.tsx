import classnames from 'classnames';
import React from 'react';

import { ChevronDownIcon } from '../icons/common.icons';

import './dropdown.scss';

interface IDropdownProps {
  options: any[];
  selected: any;
  component?: any;
  onChange?: (value: string) => void;
}

interface IDropdownState {
  isDropdownShown: boolean;
}

export class DropdownComponent extends React.PureComponent<
  IDropdownProps,
  IDropdownState
> {
  state: IDropdownState = {
    isDropdownShown: false,
  };

  private element!: HTMLDivElement;

  constructor(props: IDropdownProps) {
    super(props);

    this.onOptionChange = this.onOptionChange.bind(this);
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.hideDropdown = this.hideDropdown.bind(this);
    this.hideOnOutsideClick = this.hideOnOutsideClick.bind(this);
  }

  render(): JSX.Element {
    const { options, selected, component } = this.props;

    const ButtonComponent = component || 'button';

    const dropdownClassNames = classnames({
      'bi-dropdown': true,
      'bi-dropdown--open': this.state.isDropdownShown,
    });

    return (
      <div
        className={dropdownClassNames}
        ref={(ref: HTMLDivElement) => {
          this.element = ref;
        }}
      >
        <button
          className="bi-dropdown__button g-flex bi-btn bi-btn--flat"
          onClick={this.toggleDropdown}
        >
          <span className="bi-dropdown__button-label">{selected.label}</span>

          {this.props.options.length > 1 && (
            <ChevronDownIcon className="bi-dropdown__button-icon" />
          )}
        </button>

        <div className="bi-dropdown__dropdown">
          {options.map(({ value, label }, index) => {
            return (
              <ButtonComponent
                className="bi-dropdown__option bi-btn bi-btn--flat"
                key={`${value}${index}`}
                to={value}
                href={value}
                onClick={this.onOptionChange(value)}
              >
                {label}
              </ButtonComponent>
            );
          })}
        </div>
      </div>
    );
  }

  private toggleDropdown(): void {
    if (this.props.options.length <= 1) {
      return;
    }

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

  private onOptionChange(value: string): () => void {
    return () => {
      if (this.props.onChange) {
        this.props.onChange(value);
      }

      this.hideDropdown();
    };
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
