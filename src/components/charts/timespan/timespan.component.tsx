import * as classNames from 'classnames';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';

import { TIMESPAN } from '../../../constants/timespan.constant';

import './timespan.scss';

interface ITimespanProps {
  onChange: (selectedSpan: TIMESPAN) => void;
  selected: TIMESPAN;
}

export class TimespanComponent extends React.PureComponent<ITimespanProps> {
  constructor (props: ITimespanProps) {
    super(props);
    
    this.onSpanClick = this.onSpanClick.bind(this);
  }
  
  render (): JSX.Element {
    return (
      <div className='bi-timespan'>
        {
          Object.keys(TIMESPAN)
            .map((span) => {
              const btnClassNames = classNames({
                'bi-btn': true,
                'bi-btn--flat': true,
                'bi-timespan__span': true,
                'bi-timespan__span--active': this.props.selected === TIMESPAN[span]
              });
              
              return (
                <button className={ btnClassNames }
                        key={ span }
                        onClick={ this.onSpanClick(TIMESPAN[span]) }>
                  <FormattedMessage id={ `components.timespan.span.${ TIMESPAN[span] || 'alltime' }` }/>
                </button>
              );
            })
        }
      </div>
    );
  }
  
  private onSpanClick (span: TIMESPAN): () => void {
    return () => {
      this.props.onChange(span);
    };
  }
}
