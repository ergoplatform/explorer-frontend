import * as classNames from 'classnames';
import * as React from 'react';

interface ILimitSelectorProps {
  label: string;
  items: number[];
  selected: number;
  onLimitSelect: (limit: number) => void;
}

import './limit-selector.scss';

class LimitSelector extends React.PureComponent {
  props: ILimitSelectorProps;
  
  render (): JSX.Element {
    return (
      <div className='bi-limit-selector'>
        <span className='bi-limit-selector__label'>
          { this.props.label }
        </span>
        
        {
          this.props.items.map((item, index) => {
            const selectLimit = () => this.onLimitSelect(item);
            
            const selectorItemClassNames = classNames({
              'bi-btn': true,
              'bi-btn--flat': true,
              'bi-limit-selector__item': true,
              'bi-limit-selector__item--selected': item === this.props.selected
            });
            
            return (
              <button className={ selectorItemClassNames }
                      key={ index }
                      onClick={ selectLimit }>
                { item }
              </button>
            );
          })
        }
      </div>
    );
  }
  
  private onLimitSelect (limit: number): void {
    this.props.onLimitSelect(limit);
  }
}

export const LimitSelectorComponent = LimitSelector;
