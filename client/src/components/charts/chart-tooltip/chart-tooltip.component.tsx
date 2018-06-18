import * as dayjs from 'dayjs';
import * as React from 'react';

import { convertInfoItemValue } from '../../../utils/convertInfoItemvalue';

import './chart-tooltip.scss';

export class ChartTooltipComponent extends React.PureComponent {
  props: {
    type: string,
    payload: any[],
    label: string,
  };
  
  render (): JSX.Element {
    const date = dayjs(this.props.label)
      .format('DD.MM.YYYY');
    
    return (
      <div className='bi-chart-tooltip'>
        <div className='bi-chart-tooltip__label'>{ date }</div>
        { this.props.payload[0] ? convertInfoItemValue( this.props.payload[0].payload.type || 'chart', this.props.payload[0].value) : null }
      </div>
    );
  }
}
