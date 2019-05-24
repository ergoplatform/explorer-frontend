import * as classnames from 'classnames';
import * as React from 'react';

import './dropdown-list.scss';

interface IDropdownProps {
  list: any[];
  button: string;
}

interface IDropdownState {
  isDropdownShown: boolean;
}

export class DropdownListComponent extends React.PureComponent<IDropdownProps, IDropdownState> {
  state: IDropdownState = {
    isDropdownShown: false
  };

  private element: HTMLDivElement;

  constructor (props: IDropdownProps) {
    super(props);

    this.toggleDropdown     = this.toggleDropdown.bind(this);
    this.hideDropdown       = this.hideDropdown.bind(this);
    this.hideOnOutsideClick = this.hideOnOutsideClick.bind(this);
  }

  render (): JSX.Element {
    const { list, button } = this.props;

    const dropdownClassNames = classnames({
      'bi-dropdown': true,
      'bi-dropdown--open': this.state.isDropdownShown
    });

    return (
      <div className={ dropdownClassNames }
           ref={ (ref: HTMLDivElement) => {
             this.element = ref;
           } }>
        <button className='bi-dropdown__button g-flex bi-btn bi-btn--flat'
                onClick={ this.toggleDropdown }>
          <span className='bi-dropdown__button-label'>{ button }</span>
        </button>

        <div className='bi-dropdown__dropdown'>
          <ul>
            {
              list.map((option: any) => {
                return (
                  <li className='bi-dropdown__option bi-btn bi-btn--flat'
                                  key={ option.value }>
                    { option.label } { option.sublabel }
                  </li>
                );
              })
            }
          </ul>
        </div>
      </div>
    );
  }

  private toggleDropdown (): void {
    if (this.state.isDropdownShown) {
      return this.hideDropdown();
    }

    this.setState({
      isDropdownShown: true
    });

    document.addEventListener('click', this.hideOnOutsideClick);
  }

  private hideDropdown (): void {
    this.setState({
      isDropdownShown: false
    });

    document.removeEventListener('click', this.hideOnOutsideClick);
  }

  private hideOnOutsideClick (event: MouseEvent): void {
    if (event.target !== this.element && document.contains(event.target as Node) && !this.element.contains(event.target as Node)) {
      this.hideDropdown();
    }
  }
}
