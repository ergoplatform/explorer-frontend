import * as React from 'react';
import ObjectInspector from 'react-object-inspector';

interface IApiResponseProps {
  code: string;
  response: any;
}

import './api-response.scss';

export class ApiResponseComponent extends React.PureComponent<IApiResponseProps> {
  render (): JSX.Element {
    return (
      <div className='bi-api-response'>
        <div className='bi-api-response__header'>
          Response { this.props.code }
        </div>
        <div className='bi-api-response__body'>
          { Object.keys(this.props.response.content)
            .map((key) => {
              return <ObjectInspector key={ key }
                                      data={ this.props.response.content[key] }/>;
            }) }
        </div>
      </div>
    );
  }
}
