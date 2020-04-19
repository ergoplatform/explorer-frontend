import React from 'react';

import './api-type.scss';

interface IApiTypeProps {
  schema: any;
}

export class ApiTypeComponent extends React.PureComponent<IApiTypeProps> {
  render (): JSX.Element {
    return (
      <div className='bi-api-type'>
        <span className='bi-api-type__type'>{ this.props.schema.type }</span>

        { this.props.schema.enum && (
          <div className='bi-api-type__enum'>{ this.props.schema.enum.join(', ') }</div>
        ) }
      </div>
    );
  }
}
