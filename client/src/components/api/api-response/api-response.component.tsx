import * as React from 'react';
import ReactJson from 'react-json-view';

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
              return <ReactJson key={ key }
                                collapsed={ true }
                                src={ this.props.response.content[key] }
                                displayObjectSize={ false }
                                enableClipboard={ false }
                                displayDataTypes={ false }
                                name={ false }/>;
            }) }
        </div>
      </div>
    );
  }
}
