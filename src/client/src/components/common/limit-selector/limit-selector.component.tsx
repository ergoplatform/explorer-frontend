import * as classNames from 'classnames';
import * as React from 'react';
import { Link } from 'react-router-dom';

interface ILimitSelectorProps {
  label: string | JSX.Element;
  items: number[];
  selected: number;
  getLimitLink: (limit: number) => string;
}

import './limit-selector.scss';

export class LimitSelectorComponent extends React.PureComponent<ILimitSelectorProps> {
  render (): JSX.Element {
    return (
      <div className='bi-limit-selector'>
        <span className='bi-limit-selector__label'>
          { this.props.label }
        </span>
        
        {
          this.props.items.map((item, index) => {
            const selectorItemClassNames = classNames({
              'bi-btn': true,
              'bi-btn--flat': true,
              'bi-limit-selector__item': true,
              'bi-limit-selector__item--selected': item === this.props.selected
            });
            
            return (
              <Link className={ selectorItemClassNames }
                    key={ index }
                    to={ this.props.getLimitLink(item) }>
                { item }
              </Link>
            );
          })
        }
      </div>
    );
  }
}
